import React, { useState, useEffect } from 'react'
import Feed from './feed'
import { auth } from '../firebase'
import Header from './Header'
import Body from './Body'
import "./Dashboard.css"

function Dashboard () {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // user has logged in...
        console.log(authUser);
        setUser(authUser);
        console.log("user has logged in");
      } else {
        // user has logged out..
        setUser(null);
        console.log("user has logged out");
      }
    });

    return () => {
      // perform some cleanup actions
      unsubscribe();
    };
  }, []);
  return (
    <div className="home">
      <Header user={user} />

      <div className="app__body">
        {/* Upload Option */}
        <Body user={user} />

        <Feed user={user} />
      </div>
    </div>
  );
}

export default Dashboard 
