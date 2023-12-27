const { onRequest } = require('firebase-functions/v2/https');
const { getFirestore } = require('firebase-admin/firestore');
const { onCall, HttpsError } = require('firebase-functions/v2/https');
const { initializeApp } = require('firebase-admin/app');
const logger = require('firebase-functions/logger');

initializeApp();

exports.createNewCustomer = onCall(async (request) => {
  const db = getFirestore();

  try {
    const localSaleCustomerlistSnapshot = await db.collection('LocalSalesCustomers').get();
    const localSaleCustomerlistData = localSaleCustomerlistSnapshot.docs.map((doc) => doc.data());

    const isDuplicated = localSaleCustomerlistData.find((customer) => customer.id === request.data.id);
    if (isDuplicated) {
      throw new HttpsError('already-exists', 'Duplicate customer');
    }

    // Increment index in IncrementalCounter
    const incrementalCounterDoc = await db.collection('IncrementalCounter').doc('LocalSalesCustomers').get();
    if (!incrementalCounterDoc.exists) {
      throw new HttpsError('internal', 'Counter issue');
    }
    const localSaleCustomerlistIndex = incrementalCounterDoc.data();
    await db
      .collection('IncrementalCounter')
      .doc('LocalSalesCustomers')
      .set({ index: localSaleCustomerlistIndex.index + 1 });

    // Create new customer document
    await db.collection('LocalSalesCustomers').doc(request.data.uuid).set(request.data);

    return 'Customer created';
  } catch (error) {
    throw new HttpsError('internal', error);
  }
});

exports.createNewOrder = onCall(async (request) => {
  const db = getFirestore();

  try {
    // Create new customer document
    await db.collection('LocalSalesOrders').doc(request.data.orderId).set(request.data);

    // Increment index in IncrementalCounter
    const incrementalCounterDoc = await db.collection('IncrementalCounter').doc('LocalSalesOrders').get();
    if (!incrementalCounterDoc.exists) {
      throw new HttpsError('internal', 'Counter issue');
    }
    const localSaleCustomerlistIndex = incrementalCounterDoc.data();
    await db
      .collection('IncrementalCounter')
      .doc('LocalSalesOrders')
      .set({ index: localSaleCustomerlistIndex.index + 1 });

    return 'Order created';
  } catch (error) {
    throw new HttpsError('internal', 'Order created failed');
  }
});
