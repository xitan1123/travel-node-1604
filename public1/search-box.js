var SearchBox = React.createClass({
  submit: function () {
    console.log('submit')
    $.post('archive/search.action', {
      'id': document.getElementById('search-box-value').value
    }, function (res, status) {
      if ("ERROR" == res.status) {
        layer.msg('未找到符合条件的档案');
      } else if ("OK" == res.status ) {
        if ("MULTIPLE_DATA" == res.message) {
          layer.msg('相符的档案过多');
        } else {
          window.location.href = 'archive-info.html?archiveId=' + res.message;
        }
      }
    });
  },
  render: function () {
    return (
      <div className="input-group">
        <input
          className="form-control"
          id="search-box-value"
          placeholder="档案号或身份证号"
          type="text"
        />
        <span className="input-group-btn">
          <button
            className="btn btn-default"
            onclick={this.submit}
            type="button"
          >
            <span className="glyphicon glyphicon-search" aria-hidden="true"></span>
          </button>
        </span>
      </div>
    );
  }
});
ReactDOM.render(<SearchBox />,
  document.getElementById('search-box')
);
