import { h } from '@bolt/core';
import { render } from 'react-dom';
import { SchemaForm } from './schema-form';

if (document.querySelector('.schema-form-root')) {
  document.querySelectorAll('.schema-form-root').forEach(root => {
    const dataString = root.previousElementSibling.innerHTML;
    const data = JSON.parse(dataString);
    if (data.schema) {
      console.log(data);
      render(<SchemaForm {...data} />, root);
    }
  });
}
