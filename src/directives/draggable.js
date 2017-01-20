export default {
  inserted: function (el, bindings) {
    draggableElement(el, bindings.value);
  }
};


/**
 * Enables draggable functionality to an element
 * @param  {Element} element
 * @param  {Object} settings Callbacks
 */
function draggableElement(element, settings) {
  let elementDraggable = false;
  const startPosition = {
    left: 0,
    top: 0
  };
  const elementMargin = {
    left: 0,
    top: 0
  };

  const elementInitialMargin = {
    left: 0,
    top: 0
  };

  const mouseUpHandler = function(event) {
    elementDraggable = false;
    document.removeEventListener('mouseup', mouseUpHandler);
    document.removeEventListener('mousemove', mouseMoveHandler);

    if('onDragEnd' in settings) {
      settings.onDragEnd(elementMargin, event);
    };
  };

  const mouseMoveHandler = function(event) {
    if (elementDraggable) {

      if('onDragMove' in settings) {
        settings.onDragMove(event);

        return;
      };

      if (settings.y) {
        elementMargin.top = (event.pageY - startPosition.top) + elementInitialMargin.top;
        element.style.marginTop = elementMargin.top + 'px';
      }

      if (settings.x) {
        elementMargin.left = (event.pageX - startPosition.left) + elementInitialMargin.left;
        element.style.marginLeft = elementMargin.left + 'px';
      }

    }
  };

  const mouseDownHandler = function(event) {
    event.preventDefault();
    elementDraggable = true;

      if('onDragStart' in settings) {
        settings.onDragStart(event);
      };


    if (settings.y) {
      startPosition.top = event.pageY;
      elementMargin.top = parseInt(element.style.marginTop || 0);
      elementInitialMargin.top = elementMargin.top;
    }

    if (settings.x) {
      startPosition.left = event.pageX;
      elementMargin.left = parseInt(element.style.marginLeft || 0);
      elementInitialMargin.left = elementMargin.left;
    }

    document.addEventListener('mouseup', mouseUpHandler);
    document.addEventListener('mousemove', mouseMoveHandler);
  }

  element.addEventListener('mousedown', mouseDownHandler);
}