import React from 'react';

const Message = ({ message }) => {
    return (
        <div className="alert alert-warning alert-dismissible fade show" role="alert">
            {message}
            <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
    );
};

export default Message;