import React from 'react/react';

export default function WpSearchResult({ itemList, onSelect, selected, onMouseOver, onMouseLeave }) {

        itemList = itemList || new Array();
        return (
            <ol id="mhis-search--suggest-list">
                {itemList.map(function(result, index) {

                    var className = (selected===(index+1)) ? 'active' : '';
                    return <li key={index}
                               className={className}
                               onClick={onSelect}
                               onMouseEnter={(event)=>{onMouseOver(event.target.innerHTML)}}
                               onMouseLeave={onMouseLeave}
                        >{result}</li>;
                })}

            </ol>
        );
}

WpSearchResult.propTypes = {
    itemList: React.PropTypes.array,
    selected: React.PropTypes.number,
    onSelect: React.PropTypes.func.isRequired,
    onMouseOver: React.PropTypes.func.isRequired,
    onMouseLeave: React.PropTypes.func.isRequired,
};
