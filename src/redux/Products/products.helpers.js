import { firestore } from '../../firebase/utils';

export const handleAddProduct = product => {
    return new Promise((resolve, reject) => {
        firestore
            .collection('products')
            .doc()
            .set(product)
            .then(() => {
                resolve()
            })
            .catch(err => {
                reject(err)
            })
    })
}

export const handleFetchProducts = ({ filterType, startAfterDoc, persistProducts = [] }) => {
    return new Promise((resolve, reject) => {
        const pageSize = 6;

        let ref = firestore.collection('products').orderBy('createdDate').limit(pageSize);

        if (filterType) { ref = ref.where('productCategory', '==', filterType) }
        if (startAfterDoc) { ref = ref.startAfter(startAfterDoc) }

        ref
            .get()
            .then(snapshot => {
                const totalCount = snapshot.size;

                const data = [
                    ...persistProducts,
                    ...snapshot.docs.map(doc => {
                        return {
                            ...doc.data(),
                            documentId: doc.id
                        }
                    })
                ];

                resolve({
                    data,
                    queryDoc: snapshot.docs[totalCount - 1],
                    isLastPage: totalCount < 1
                })
            })
            .catch(err => {
                reject(err);
            })
    })
}

export const handleDeleteProduct = documentId => {
    return new Promise((resolve, reject) => {
        firestore
            .collection('products')
            .doc(documentId)
            .delete()
            .then(() => {
                resolve();
            })
            .catch(err => {
                reject(err)
            })
    })
}