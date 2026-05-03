// ── SALARY TRACKER — Google Apps Script Backend ──
// 1. Paste this into script.google.com → New Project
// 2. Click Deploy → New Deployment → Web App
//    - Execute as: Me
//    - Who has access: Anyone
// 3. Copy the Web App URL and paste it into index.html as SHEET_URL

const SHEET_NAME = 'Expenses';
const SALARY_SHEET = 'Salary';

function doGet(e) {
  const action = e.parameter.action;
  if (action === 'getAll')    return getAll();
  if (action === 'getSalary') return getSalary();
  return ContentService.createTextOutput(JSON.stringify({ error: 'Unknown action' }))
    .setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  const data   = JSON.parse(e.postData.contents);
  const action = data.action;
  if (action === 'addExpense')    return addExpense(data);
  if (action === 'deleteExpense') return deleteExpense(data);
  if (action === 'setSalary')     return setSalary(data);
  if (action === 'clearAll')      return clearAll();
  return ContentService.createTextOutput(JSON.stringify({ error: 'Unknown action' }))
    .setMimeType(ContentService.MimeType.JSON);
}

// ── GET ALL EXPENSES ──
function getAll() {
  const sheet = getOrCreateSheet(SHEET_NAME);
  const rows  = sheet.getDataRange().getValues();
  if (rows.length <= 1) return json([]);
  const expenses = rows.slice(1).map(r => ({
    id:     r[0],
    desc:   r[1],
    amount: r[2],
    cat:    r[3],
    date:   r[4]
  }));
  return json(expenses);
}

// ── GET SALARY ──
function getSalary() {
  const sheet = getOrCreateSheet(SALARY_SHEET);
  const val   = sheet.getRange('A1').getValue();
  return json({ salary: val || 0 });
}

// ── SET SALARY ──
function setSalary(data) {
  const sheet = getOrCreateSheet(SALARY_SHEET);
  sheet.getRange('A1').setValue(data.salary);
  return json({ success: true });
}

// ── ADD EXPENSE ──
function addExpense(data) {
  const sheet = getOrCreateSheet(SHEET_NAME);
  // Add header if empty
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(['ID', 'Description', 'Amount', 'Category', 'Date']);
  }
  sheet.appendRow([data.id, data.desc, data.amount, data.cat, data.date]);
  return json({ success: true });
}

// ── DELETE EXPENSE ──
function deleteExpense(data) {
  const sheet = getOrCreateSheet(SHEET_NAME);
  const rows  = sheet.getDataRange().getValues();
  for (let i = 1; i < rows.length; i++) {
    if (String(rows[i][0]) === String(data.id)) {
      sheet.deleteRow(i + 1);
      return json({ success: true });
    }
  }
  return json({ success: false, error: 'Not found' });
}

// ── CLEAR ALL ──
function clearAll() {
  const sheet = getOrCreateSheet(SHEET_NAME);
  const last  = sheet.getLastRow();
  if (last > 1) sheet.deleteRows(2, last - 1);
  return json({ success: true });
}

// ── HELPERS ──
function getOrCreateSheet(name) {
  const ss    = SpreadsheetApp.getActiveSpreadsheet();
  let   sheet = ss.getSheetByName(name);
  if (!sheet) sheet = ss.insertSheet(name);
  return sheet;
}

function json(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
