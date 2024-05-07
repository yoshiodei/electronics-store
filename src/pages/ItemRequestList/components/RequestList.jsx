import React, { useEffect, useState } from 'react';
import { collection, getDocs } from '@firebase/firestore';
import RequestItemCard from './RequestItemCard';
import Loader from '../../../components/Loader';
import { db } from '../../../config/firebaseConfig';

export default function RequestList({ search }) {
  const [isLoading, setIsLoading] = useState(false);
  const [requests, setRequests] = useState([]);

  const fetchRequests = async () => {
    setIsLoading(true);
    const querySnapshot = await getDocs(collection(db, 'BuyerRequest'));
    const requestData = [];
    querySnapshot.forEach((doc) => {
      const queryData = doc.data();
      requestData.push({ ...queryData, id: doc.id });
    });
    setRequests(requestData);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (isLoading === true && requests.length === 0) {
    return (<Loader />);
  }

  if (isLoading === false && requests.length === 0) {
    return (<div>Empty list</div>);
  }

  const newRequestList = requests.filter((request) => (
    request.name.toLowerCase().includes(search.toLowerCase())
  ));

  if (newRequestList.length === 0) {
    return (<div>Search not found</div>);
  }

  return (
    <div className="row g-2">
      {
        newRequestList.map(
          (request) => (
            <div className="col-12 col-sm-6 col-md-3">
              <RequestItemCard request={request} />
            </div>
          ),
        )
}
    </div>
  );
}
