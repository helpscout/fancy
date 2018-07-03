// @flow
/**
 * Retrieves the document where the React Component has been
 * mounted to.
 *
 * @param   {React.Component} Component
 * @returns {document}
 */
function getDocumentFromReactComponent(Component: Object): document {
  if (!Component || typeof Component !== 'object') return document

  // React 16.x
  if (Component._reactInternalFiber) {
    return (
      Component._reactInternalFiber.return &&
      Component._reactInternalFiber.return.stateNode &&
      Component._reactInternalFiber.return.stateNode.ownerDocument
    )
    // React 15.x
  } else if (Component._reactInternalInstance) {
    return (
      Component._reactInternalInstance._context &&
      Component._reactInternalInstance._context.document
    )
  } else {
    return document
  }
}

export default getDocumentFromReactComponent
