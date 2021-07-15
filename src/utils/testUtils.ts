export const getElement = (wrapper, element) => {
   return wrapper.find(`[data-test='${element}']`);
}