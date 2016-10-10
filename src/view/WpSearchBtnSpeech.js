/*
 * Author: mhaasler
 * Author URI: http://www.mhaasler.de
 * Copyright 2016  Maik Haasler  (email : m.haasler@gmx.de)
 */

import React from 'react/react';

export default function WpSpeechBtn({onMicroEnter, onSpeech, onMicroLeave, speechRecognition }){

    if (speechRecognition > 0) {



        return (
            <div id="input--speech-btn"
                 className="speech-btn"
                 onClick={(event)=>{onSpeech(event)}}
                 onMouseEnter={(event)=>{onMicroEnter(event)}}
                 onMouseLeave={(event)=>{onMicroLeave(event)}}
            >
                <svg width="100%" height="100%" viewBox="0 0 792 792">
		            <g>
			            <path d="M668.25,470.25h-49.5C596.228,569.423,501.979,643.5,396,643.5s-200.228-74.077-222.75-173.25h-49.5
                            c21.854,118.775,125.309,210.622,247.5,221.637V742.5H346.5c-13.662,0-24.75,11.088-24.75,24.75S332.838,792,346.5,792h99
                            c13.662,0,24.75-11.088,24.75-24.75s-11.088-24.75-24.75-24.75h-24.75v-50.613C542.94,680.872,646.396,589.025,668.25,470.25z
                             M396,594c95.684,0,173.25-77.566,173.25-173.25v-247.5C569.25,77.566,491.684,0,396,0S222.75,77.566,222.75,173.25v247.5
                            C222.75,516.434,300.316,594,396,594z M272.25,173.25c0-68.335,55.415-123.75,123.75-123.75s123.75,55.415,123.75,123.75v247.5
                            c0,68.335-55.415,123.75-123.75,123.75s-123.75-55.415-123.75-123.75V173.25z"/>
		            </g>
                </svg>
            </div>
        )
    }
    return null;
};

WpSpeechBtn.propTypes = {
    onSpeech: React.PropTypes.func,
    onMicroLeave: React.PropTypes.func,
    onMicroEnter: React.PropTypes.func,
    speechRecognition: React.PropTypes.number,
};
