import React from 'react';

const MainContent = (props) => {
  return (
    <div className="col-sm-8">
      <form onSubmit={props.handleSubmit} onChange={props.handleChange}>
        <div className="form-group">
          <label>Title:</label>
          <input name="title" className="form-control" value={props.currentNote.title}/>
          <label>Content:</label>
          <textarea name="body" className="form-control" rows="8" cols="80" value={props.currentNote.body}/>
          <button className="btn btn-default">Done</button>
        </div>
      </form>
    </div>
  )
}

export default MainContent;
