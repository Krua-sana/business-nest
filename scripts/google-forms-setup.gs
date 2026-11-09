/**
 * Business Nest — website forms → Google Forms, with email alerts and reminders
 * ============================================================================
 *
 * What this script does (run `setup` once):
 *   1. Creates 4 Google Forms, one per website form:
 *        Workshop sign-up · Team booking request · Workshop proposal · Expert application
 *   2. Saves all answers in one Google Sheet: "Business Nest — website requests"
 *      (one tab per form, plus a "Status" column you fill in with "Done").
 *   3. Emails you every new request immediately (reply goes straight to the sender).
 *   4. Emails you a daily reminder of requests that are still not marked "Done"
 *      after REMINDER_AFTER_DAYS days.
 *   5. Prints the connection codes for the website (copy them into
 *      src/data/forms.ts, or send them to whoever maintains the site).
 *
 * How to run it:
 *   1. Go to https://script.google.com → "New project".
 *   2. Delete the example code, paste this whole file, and click Save.
 *   3. Optional: put your email in NOTIFY_EMAIL below (empty = your Google account).
 *   4. Choose the function "setup" in the toolbar and click Run.
 *      Google asks for permission (Forms, Sheets, sending email): allow it.
 *   5. Open "Execution log" and copy everything between the two ===== lines.
 *      The same text is also in the "Website connection" tab of the new Google Sheet.
 *
 * Other functions you can run later:
 *   printConfig()         — show the website connection codes again
 *   sendReminders()       — send the reminder email right now (to test it)
 *   watchExistingForms()  — also get instant email alerts for Google Forms you
 *                           already have (e.g. the 10 Saturdays application).
 *                           Add them to EXISTING_FORMS below first, then run it.
 */

// ---------- Settings ----------
const NOTIFY_EMAIL = '';          // e.g. 'info@business-nest.nl'; empty = the account running this script
const REMINDER_AFTER_DAYS = 2;    // remind about requests not marked "Done" after this many days
const REMINDER_HOUR = 9;          // daily reminder around this hour (your Google account's time zone)
const SHEET_NAME = 'Business Nest — website requests';

// Existing Google Forms that should also send you an email for every new response.
// Paste each form's EDIT link (…/forms/d/…/edit) and who should get the email,
// then run watchExistingForms(). Running it again skips forms that are already set up.
const EXISTING_FORMS = [
  // { url: 'https://docs.google.com/forms/d/…/edit', notify: 'you@example.com' },
];

// ---------- Forms (keys must match src/data/forms.ts on the website) ----------
const FORMS = [
  {
    kind: 'signup',
    title: 'Business Nest website · Workshop sign-up',
    description: 'Sign-ups for open workshop sessions and waiting lists, sent from business-nest.nl.',
    tab: 'Workshop sign-ups',
    subject: 'New workshop sign-up',
    fields: [['workshop', 'Workshop'], ['name', 'Full name'], ['email', 'Email']],
  },
  {
    kind: 'team',
    title: 'Business Nest website · Team booking request',
    description: 'Companies requesting a workshop for their team, sent from business-nest.nl.',
    tab: 'Team bookings',
    subject: 'New team booking request',
    fields: [
      ['workshop', 'Workshop'], ['name', 'Name'], ['email', 'Work email'], ['company', 'Company'],
      ['team_size', 'Number of participants'], ['preferred_dates', 'Preferred dates'],
      ['location', 'Location'], ['language', 'Language'], ['goals', 'What would you like to achieve?', true],
    ],
  },
  {
    kind: 'proposal',
    title: 'Business Nest website · Workshop proposal',
    description: 'People who want to organise a workshop at Business Nest, sent from business-nest.nl.',
    tab: 'Workshop proposals',
    subject: 'New workshop proposal',
    fields: [
      ['name', 'Full name'], ['email', 'Email'], ['phone', 'Phone'], ['organisation', 'Company / organisation'],
      ['workshop_topic', 'Workshop topic'], ['description', 'Short description', true],
      ['group_size', 'Expected group size'], ['preferred_period', 'Preferred period'],
    ],
  },
  {
    kind: 'expert',
    title: 'Business Nest website · Expert application',
    description: 'People applying to become a Business Nest expert, sent from business-nest.nl.',
    tab: 'Expert applications',
    subject: 'New expert application',
    fields: [
      ['name', 'Full name'], ['email', 'Email'], ['phone', 'Phone'], ['linkedin', 'LinkedIn profile'],
      ['expertise', 'Area of expertise'], ['motivation', 'How would you like to support founders?', true],
    ],
  },
];

// ============================================================================

function setup() {
  const props = PropertiesService.getScriptProperties();
  if (props.getProperty('SHEET_ID')) {
    throw new Error('Setup has already run. Run printConfig() to see the website codes again.');
  }

  const ss = SpreadsheetApp.create(SHEET_NAME);
  const config = {};
  const kinds = {};

  FORMS.forEach(function (def) {
    const form = FormApp.create(def.title);
    form.setDescription(def.description);
    form.setCollectEmail(false);
    form.setAcceptingResponses(true);
    form.setShowLinkToRespondAgain(false);
    try { form.setRequireLogin(false); } catch (e) { /* only exists for Workspace accounts */ }

    def.fields.forEach(function (f) {
      const item = f[2] ? form.addParagraphTextItem() : form.addTextItem();
      item.setTitle(f[1]); // not "required": the website already checks required fields
    });

    try { if (form.setPublished) form.setPublished(true); } catch (e) { /* older Forms versions publish by default */ }

    form.setDestination(FormApp.DestinationType.SPREADSHEET, ss.getId());
    ScriptApp.newTrigger('onWebsiteSubmit').forForm(form).onFormSubmit().create();

    config[def.kind] = buildTarget_(form, def);
    kinds[form.getId()] = def.kind;
  });

  SpreadsheetApp.flush();
  prepareTabs_(ss.getId());

  props.setProperties({
    SHEET_ID: ss.getId(),
    FORM_KINDS: JSON.stringify(kinds),
    CONFIG: JSON.stringify(config),
  });

  ScriptApp.newTrigger('sendReminders').timeBased().everyDays(1).atHour(REMINDER_HOUR).create();

  writeConfigTab_(ss.getId());
  printConfig();
  Logger.log('Google Sheet: ' + ss.getUrl());
}

/** Builds { action, fields } for the website from a pre-filled link. */
function buildTarget_(form, def) {
  const response = form.createResponse();
  form.getItems().forEach(function (item, i) {
    const r = item.getType() === FormApp.ItemType.PARAGRAPH_TEXT
      ? item.asParagraphTextItem().createResponse('X' + i)
      : item.asTextItem().createResponse('X' + i);
    response.withItemResponse(r);
  });
  const url = response.toPrefilledUrl();
  const fields = {};
  def.fields.forEach(function (f, i) {
    const m = url.match(new RegExp('(entry\\.\\d+)=X' + i + '(?:&|$)'));
    if (m) fields[f[0]] = m[1];
  });
  return {
    action: form.getPublishedUrl().replace(/\/viewform.*$/, '/formResponse'),
    fields: fields,
  };
}

/** Finds the response tab of each form: [{ def, sh }]. */
function formSheets_(ss) {
  const byTitle = {};
  FORMS.forEach(function (d) { byTitle[d.title] = d; });
  const found = [];
  ss.getSheets().forEach(function (sh) {
    let def = FORMS.filter(function (d) { return d.tab === sh.getName(); })[0];
    if (!def && sh.getFormUrl()) {
      try { def = byTitle[FormApp.openByUrl(sh.getFormUrl()).getTitle()]; } catch (e) { /* form deleted */ }
    }
    if (def) found.push({ def: def, sh: sh });
  });
  return found;
}

/** Names the response tabs and adds a "Status" column with a Done / In progress dropdown. */
function prepareTabs_(sheetId) {
  const ss = SpreadsheetApp.openById(sheetId);
  formSheets_(ss).forEach(function (x) {
    const def = x.def, sh = x.sh;
    sh.setName(def.tab);
    const statusCol = def.fields.length + 2; // Timestamp + fields + Status
    sh.getRange(1, statusCol).setValue('Status').setFontWeight('bold')
      .setNote('Type or choose "Done" when you have handled this request. Unhandled requests are included in the daily reminder.');
    const rule = SpreadsheetApp.newDataValidation().requireValueInList(['In progress', 'Done'], true).setAllowInvalid(true).build();
    sh.getRange(2, statusCol, 999, 1).setDataValidation(rule);
    sh.setFrozenRows(1);
  });

  const first = ss.getSheets()[0];
  if (!first.getFormUrl() && first.getLastRow() === 0 && ss.getSheets().length > 1) ss.deleteSheet(first);
}

/** Instant email for every new submission. */
function onWebsiteSubmit(e) {
  const props = PropertiesService.getScriptProperties();
  const kinds = JSON.parse(props.getProperty('FORM_KINDS') || '{}');
  const form = e.source;
  const kind = kinds[form.getId()];
  const def = FORMS.filter(function (d) { return d.kind === kind; })[0];

  const answers = e.response.getItemResponses().map(function (r) {
    return [r.getItem().getTitle(), String(r.getResponse())];
  });
  const get = function (title) {
    const a = answers.filter(function (x) { return x[0] === title; })[0];
    return a ? a[1] : '';
  };
  const who = get('Full name') || get('Name') || get('Naam') || '';
  const about = get('Workshop') || get('Workshop topic') || get('Area of expertise') || '';
  const replyTo = get('Email') || get('Work email') || '';
  const subjectBase = def ? def.subject : 'New response: ' + (kind || form.getTitle());
  const sheetLinkId = def ? props.getProperty('SHEET_ID') : null; // existing forms keep their own sheet
  const subject = subjectBase + (about ? ' · ' + about : '') + (who ? ' — ' + who : '');

  const rows = answers.map(function (a) {
    return '<tr><td style="padding:6px 12px 6px 0;color:#4B5563;vertical-align:top">' + esc_(a[0]) +
      '</td><td style="padding:6px 0;color:#111827">' + esc_(a[1]).replace(/\n/g, '<br>') + '</td></tr>';
  }).join('');
  const sheetId = sheetLinkId;
  const sheetLink = sheetId ? '<p><a href="https://docs.google.com/spreadsheets/d/' + sheetId + '">Open the requests sheet</a> and mark it "Done" when handled.</p>' : '';
  const html = '<div style="font-family:Arial,sans-serif;font-size:14px">' +
    '<p><strong>' + esc_(subjectBase) + '</strong> from the Business Nest website.</p>' +
    '<table>' + rows + '</table>' + sheetLink +
    (replyTo ? '<p style="color:#4B5563">Reply to this email to answer ' + esc_(who || replyTo) + ' directly.</p>' : '') +
    '</div>';

  const overrides = JSON.parse(props.getProperty('NOTIFY_OVERRIDES') || '{}');
  const mail = { to: overrides[form.getId()] || recipient_(), subject: subject, htmlBody: html };
  if (replyTo && /@/.test(replyTo)) mail.replyTo = replyTo;
  MailApp.sendEmail(mail);
}

/** Daily email listing requests not marked "Done" after REMINDER_AFTER_DAYS days. */
function sendReminders() {
  const props = PropertiesService.getScriptProperties();
  const sheetId = props.getProperty('SHEET_ID');
  if (!sheetId) return;
  const ss = SpreadsheetApp.openById(sheetId);
  const cutoff = Date.now() - REMINDER_AFTER_DAYS * 24 * 60 * 60 * 1000;
  const tz = Session.getScriptTimeZone();
  const sections = [];
  let total = 0;

  formSheets_(ss).forEach(function (x) {
    const def = x.def, sh = x.sh;
    if (sh.getLastRow() < 2) return;
    const values = sh.getDataRange().getValues();
    const header = values[0];
    const st = header.indexOf('Status');
    const nameIdx = header.indexOf('Full name') > -1 ? header.indexOf('Full name') : header.indexOf('Name');
    const emailIdx = header.indexOf('Email') > -1 ? header.indexOf('Email') : header.indexOf('Work email');
    const aboutIdx = ['Workshop', 'Workshop topic', 'Area of expertise'].map(function (h) { return header.indexOf(h); })
      .filter(function (i) { return i > -1; })[0];

    const open = values.slice(1).filter(function (row) {
      const ts = row[0];
      if (!ts || typeof ts.getTime !== 'function' || ts.getTime() > cutoff) return false; // skip empty rows and new requests
      return st < 0 || String(row[st]).trim().toLowerCase() !== 'done';
    });
    if (!open.length) return;
    total += open.length;
    const items = open.map(function (row) {
      const parts = [Utilities.formatDate(row[0], tz, 'd MMM yyyy')];
      if (nameIdx > -1 && row[nameIdx]) parts.push(esc_(row[nameIdx]));
      if (emailIdx > -1 && row[emailIdx]) parts.push(esc_(row[emailIdx]));
      if (aboutIdx !== undefined && row[aboutIdx]) parts.push(esc_(row[aboutIdx]));
      return '<li>' + parts.join(' · ') + '</li>';
    }).join('');
    sections.push('<h3 style="margin:16px 0 6px">' + esc_(def.tab) + ' (' + open.length + ')</h3><ul>' + items + '</ul>');
  });

  if (!total) return;
  MailApp.sendEmail({
    to: recipient_(),
    subject: 'Reminder: ' + total + ' website request' + (total === 1 ? '' : 's') + ' waiting for you',
    htmlBody: '<div style="font-family:Arial,sans-serif;font-size:14px">' +
      '<p>These requests are older than ' + REMINDER_AFTER_DAYS + ' days and not marked "Done" yet:</p>' +
      sections.join('') +
      '<p><a href="' + ss.getUrl() + '">Open the requests sheet</a> and set Status to "Done" to stop reminders for a request.</p></div>',
  });
}

/** Turns on instant email alerts for the forms listed in EXISTING_FORMS. */
function watchExistingForms() {
  if (!EXISTING_FORMS.length) throw new Error('Add at least one form to EXISTING_FORMS at the top of the script first.');
  const props = PropertiesService.getScriptProperties();
  const kinds = JSON.parse(props.getProperty('FORM_KINDS') || '{}');
  const notify = JSON.parse(props.getProperty('NOTIFY_OVERRIDES') || '{}');
  const watched = ScriptApp.getProjectTriggers()
    .filter(function (t) { return t.getHandlerFunction() === 'onWebsiteSubmit'; })
    .map(function (t) { return t.getTriggerSourceId(); });

  EXISTING_FORMS.forEach(function (f) {
    const form = FormApp.openByUrl(f.url);
    const id = form.getId();
    if (watched.indexOf(id) < 0) ScriptApp.newTrigger('onWebsiteSubmit').forForm(form).onFormSubmit().create();
    kinds[id] = kinds[id] || form.getTitle();
    if (f.notify) notify[id] = f.notify; else delete notify[id];
    Logger.log('Email alerts on for "' + form.getTitle() + '" → ' + (f.notify || recipient_()));
  });
  props.setProperty('FORM_KINDS', JSON.stringify(kinds));
  props.setProperty('NOTIFY_OVERRIDES', JSON.stringify(notify));
}

/** Prints the block to paste into src/data/forms.ts on the website. */
function printConfig() {
  Logger.log('\n=====\n' + configText_() + '\n=====');
}

function configText_() {
  const config = JSON.parse(PropertiesService.getScriptProperties().getProperty('CONFIG') || '{}');
  return 'export const GOOGLE_FORMS: Record<FormKind, GoogleFormTarget | null> = ' + JSON.stringify(config, null, 2) + ';';
}

function writeConfigTab_(sheetId) {
  const ss = SpreadsheetApp.openById(sheetId);
  const sh = ss.insertSheet('Website connection');
  sh.getRange(1, 1).setValue('Copy cell A3 into src/data/forms.ts on the website (replace the GOOGLE_FORMS block).');
  sh.getRange(3, 1).setValue(configText_()).setWrap(true);
  sh.setColumnWidth(1, 900);
}

function recipient_() {
  return NOTIFY_EMAIL || Session.getEffectiveUser().getEmail();
}

function esc_(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
