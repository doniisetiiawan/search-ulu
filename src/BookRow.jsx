import React from 'react';

export default function BookRow(props) {
  return (
    <tr style={props.style}>
      <td>{props.title}</td>
      <td>{(props.author_name || []).join(', ')}</td>
      <td>{props.edition_count}</td>
    </tr>
  );
}
