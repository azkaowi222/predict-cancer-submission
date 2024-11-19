const { Firestore } = require("@google-cloud/firestore");

const db = new Firestore();
const storeData = (id, data) => {
  const predictCollection = db.collection("prediction");
  return predictCollection.doc(id).set(data);
};

const historiesData = async () => {
  const predictCollection = db.collection("prediction");
  const { docs } = await predictCollection.get();
  const datas = docs.map((doc) => {
    return doc.data();
  });
  return datas;
};

module.exports = { storeData, historiesData };
