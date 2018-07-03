import getDocumentFromReactComponent from '../getDocumentFromReactComponent'

describe('getDocumentFromReactComponent', () => {
  test('Returns document by default', () => {
    expect(getDocumentFromReactComponent()).toEqual(document)
  })

  test('Returns document, if invalid argument', () => {
    expect(getDocumentFromReactComponent([])).toEqual(document)
    expect(getDocumentFromReactComponent(123)).toEqual(document)
    expect(getDocumentFromReactComponent('a')).toEqual(document)
  })

  test('Supports React v16.x', () => {
    const mockDocument = 0
    // Naive assumption of React.Component internals.
    // Works as of v16.3.x
    const component = {
      _reactInternalFiber: {
        return: {
          stateNode: {
            ownerDocument: mockDocument,
          },
        },
      },
    }

    expect(getDocumentFromReactComponent(component)).not.toEqual(document)
    expect(getDocumentFromReactComponent(component)).toEqual(mockDocument)
  })

  test('Supports React v15.x', () => {
    const mockDocument = 0
    // Naive assumption of React.Component internals.
    // Works as of v15.6.x
    const component = {
      _reactInternalInstance: {
        _context: {
          document: mockDocument,
        },
      },
    }

    expect(getDocumentFromReactComponent(component)).not.toEqual(document)
    expect(getDocumentFromReactComponent(component)).toEqual(mockDocument)
  })

  test('Fallsback to window.document for unsupported React components', () => {
    const mockDocument = 0
    // Naive assumption of React.Component internals.
    // Works as of v15.6.x
    const component = {
      _nopeFakeReactInternalsNope: {
        _context: {
          document: mockDocument,
        },
      },
    }

    expect(getDocumentFromReactComponent(component)).toEqual(document)
    expect(getDocumentFromReactComponent(component)).not.toEqual(mockDocument)
  })
})
