import React from 'react';

const ListCard = (props) => {
  let title, body, id, thisNote, currentNote, thisClass
  if (props.data) {
    id = props.data.id
    title = props.data.title
    body = props.data.body
    body = body.slice(0,100)
    thisNote = props.data
    currentNote=props.currentNote
  }
  thisClass = currentNote.id === thisNote.id ? "panel panel-default current-note" : "panel panel-default"


  return (
    <div className={thisClass} id={id} onClick={(e) => props.clickCard(thisNote, e)}>
      <div className="panel-heading">
        <h4>{title}<span name="delete" className="glyphicon glyphicon-trash pull-right"></span></h4>
      </div>
      <div className="panel-body">
        {body}
      </div>
    </div>

  );
}

export default ListCard;
