import { Link, useLocation } from 'react-router-dom'
import Breadcrumb from 'react-bootstrap/Breadcrumb'

function Breadcrumbs ({ extraItems = null }) {
  const isExtraItems = extraItems !== null ? true : false

  return (
    <Breadcrumb>
      <Breadcrumb.Item>
        <Link to={'/'}>Home</Link>
      </Breadcrumb.Item>

      {isExtraItems &&
        extraItems.map(item => <Breadcrumb.Item>{item}</Breadcrumb.Item>)}
    </Breadcrumb>
  )
}

export default Breadcrumbs
