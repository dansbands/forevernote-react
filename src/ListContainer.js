import React from 'react';
import ListCard from './ListCard';

const ListContainer = (props) => {
  let listItems = props.notes
  let listCards

  listCards = listItems.map((item, index) => {
    return (
      <ListCard
        key={index}
        data={item}
        clickCard={props.clickCard}
        currentNote={props.currentNote}
      />
    );
  })

  return (
    <div className="col-sm-4">
      <h3>List Cards<span onClick={props.clickNew} className="glyphicon glyphicon-plus-sign pull-right"></span></h3>
      <div className="list-cards">
        { listCards }
      </div>
    </div>

  );


}

export default ListContainer;
