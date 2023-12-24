const { onRequest } = require('firebase-functions/v2/https');
const { getFirestore } = require('firebase-admin/firestore');
const { onCall } = require('firebase-functions/v2/https');
const { initializeApp } = require('firebase-admin/app');
const logger = require('firebase-functions/logger');

initializeApp();

exports.getCustomerIncrementalId = onCall(async () => {
  const db = getFirestore();
  try {
    const snapshot = await db.collection('LocalSalesCustomer').get();
    const data = snapshot.docs.map((doc) => doc.data());
    return data.length;
  } catch (error) {
    throw new functions.https.HttpsError('internal', '發生錯誤', error.message);
  }
});
