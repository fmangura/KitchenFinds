import React from 'react';
import '../routes/Landing.css'

export default function LandingPhotos () {

    return (
            <div className='right-layout' style={{display:'flex', flexDirection:'row'}}>
                <span className='col1'>
                    <img src="https://images.unsplash.com/photo-1481931098730-318b6f776db0?q=80&w=3090&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" style={{width:'80%', height:'364px'}}/>

                    <img src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" style={{width:'100%', height:'293px'}}/>
                </span>

                <span style={{display:'flex', flexDirection:'column'}} className='col2'>
                    <img src="https://images.unsplash.com/photo-1514516870926-20598973e480?q=80&w=3147&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" style={{width:'100%', height:'507px'}}/>
                </span>

                <span style={{display:'flex', flexDirection:'column'}} className='col3'>
                    <img src="https://images.unsplash.com/photo-1529042410759-befb1204b468?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzV8fGZvb2R8ZW58MHx8MHx8fDA%3D" alt="" style={{width:'100%', height:'200px'}}/>
                    <img src="https://images.unsplash.com/photo-1600335895229-6e75511892c8?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" style={{width:'80%', height:'366px'}}/>
                </span>
            </div>
    );
}