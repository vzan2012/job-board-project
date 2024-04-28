const locale = navigator.language;
const mediumDateFormat = new Intl.DateTimeFormat(locale, {
  dateStyle: "medium",
});
const longDateFormat = new Intl.DateTimeFormat(locale, { dateStyle: "long" });

/**
 * Format Date
 *
 * @param {*} isoString
 * @param {string} [style="medium"]
 * @returns {*}
 */
export const formatDate = (isoString, style = "medium") => {
  const date = new Date(isoString);
  return style === "long"
    ? longDateFormat.format(date)
    : mediumDateFormat.format(date);
};
