import React  from 'react';
import  './Forbidden.scss';

const Forbidden = () => (
  <div className='root'>
    <h1 className='title'>403</h1>
    <p>Forbidden</p>
  </div>
);

export { Forbidden as ForbiddenWithoutDecorators };
export default withStyles(s)(Forbidden);
