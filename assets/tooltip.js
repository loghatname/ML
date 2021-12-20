// import $ from 'https://cdn.skypack.dev/cash-dom'; 
import { computePosition, offset } from 'https://cdn.skypack.dev/@floating-ui/dom@0.1.7';

const tooltip = document.createElement('div');
tooltip.id = 'tooltip';
tooltip.setAttribute('role', 'tooltip');

const tooltipArrow = document.createElement('div');
tooltipArrow.id = 'arrow';

const text = document.createElement('span');
text.id = 'text';

tooltip.append(tooltipArrow, text);
document.body.appendChild(tooltip);

const elementsWithTooltip = document.querySelectorAll('[data-tooltip]');

const showEvents = ['mouseenter', 'focus'];
const hideEvents = ['mouseleave', 'blur'];
elementsWithTooltip.forEach(element => {
  /// for debug:
  // showTooltip(element)
  showEvents.forEach((e) =>
    element.addEventListener(e, showTooltip.bind(null, element))
  );
  hideEvents.forEach((e) =>
    element.addEventListener(e, hideTooltip)
  );
});

function showTooltip(element) {
  tooltip.style.display = 'block';
  text.textContent = element.dataset.tooltip;
  updateTooltip(element);
}

function hideTooltip() {
  tooltip.style.display = '';
  text.textContent = '';
}


function updateTooltip(element) {
  computePosition(element, tooltip, {
    placement: 'top-start',
    middleware: [
      offset(10),
    ],
  }).then(({ x, y, placement, middlewareData }) => {
    Object.assign(tooltip.style, {
      left: `${x}px`,
      top: `${y}px`,
    });
  });
}