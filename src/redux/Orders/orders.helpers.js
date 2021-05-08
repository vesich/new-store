import { firestore } from '../../firebase/utils';

export const handleSaveOrder = order => {
    return new Promise((resolove, reject) => {
        firestore
            .collection('orders')
            .doc()
            .set(order)
            .then(() => {
                resolove();
            })
            .catch(err => {
                reject(err)
            });
    })
}

export const handleGetUserOrderHistory = uid => {
    return new Promise((resolve, reject) => {

        let ref = firestore.collection('orders').orderBy('orderCreatedDate')
        ref = ref.where('orderUserId', '==', uid);

        ref
            .get()
            .then(snap => {
                const data = [
                    ...snap.docs.map(doc => {
                        return {
                            ...doc.data(),
                            documentId: doc.id
                        }
                    })
                ]

                resolve({ data });
            })
            .catch(err => {
                reject(err)
            });
    })
}

export const handleGetOrder = orderId => {
    return new Promise((resolve, reject) => {
        firestore
            .collection('orders')
            .doc(orderId)
            .get()
            .then(snap => {
                if (snap.exists) {
                    resolve({
                        ...snap.data(),
                        documentId: orderId
                    })
                }
            })
            .catch(err => {
                reject(err)
            })
    })
}