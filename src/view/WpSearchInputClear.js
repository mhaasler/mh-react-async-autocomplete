import React from 'react/react';

export default function WpInputClearBtn({inputValue, onClear, loadingValue}){


    if (inputValue.length > 0 ) {

        var loadingClass = loadingValue > 0 ? ' loading ' : '';

        return (
            <div id="input--status-clean-btn"
                 className={loadingClass}
                 onClick={onClear}
            >X</div>
        )
    }

    return null;

};

WpInputClearBtn.propTypes = {
    inputValue: React.PropTypes.string,
    onClear: React.PropTypes.func.isRequired,
};
