import React from 'react';
import LeftPanel from './Leftpanel';
import RightPanel from './Rightpanel';

function Login() {
  return (
    <div style={{flexDirection:"row",display: "flex"}}>
      {/* <LeftPanel/> */}
      <RightPanel/>
    </div>
  )
}

export default Login