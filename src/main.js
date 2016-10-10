// React
import React from 'react';
import ReactDOM from 'react-dom';
import WpSearchController from './controller/WpSearchController';
import {mountpoint} from './config/settings';


// Render application
ReactDOM.render(
    <WpSearchController />,
    document.getElementById(mountpoint)
);


