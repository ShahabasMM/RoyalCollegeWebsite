/** Every course carries this recognition, so it is defined once. */
export const APPROVAL_NOTE = "Kerala Govt Approved Certificate";

/** Short form used on the cards. */
export const APPROVAL_BADGE = "Kerala Govt Approved";

export type AddOnCourse = {
  /** Two-digit reference shown on the card and in the details dialog. */
  code: string;
  title: string;
  duration: string;
  mode: string;
};

export const addOnCourses: AddOnCourse[] = [
  {
    code: "01",
    title: "PG Diploma in Hospital Administration",
    duration: "6 Months",
    mode: "Offline",
  },
  {
    code: "02",
    title: "Hospital Administration (Plus Two)",
    duration: "12 Months",
    mode: "Offline",
  },
  {
    code: "03",
    title: "Digital Marketing",
    duration: "3 Months",
    mode: "Offline",
  },
  {
    code: "04",
    title: "Logistics and Supply Chain Management",
    duration: "12 Months",
    mode: "Offline",
  },
  {
    code: "05",
    title: "Advanced Excel",
    duration: "2 Months",
    mode: "Offline",
  },
  {
    code: "06",
    title: "Diploma in Computerised Financial Accounting",
    duration: "6 Months",
    mode: "Offline",
  },
  {
    code: "07",
    title: "Data Entry and Office Automation (English and Malayalam)",
    duration: "4 Months",
    mode: "Offline",
  },
  {
    code: "08",
    title: "Computerised Financial Accounting — Tally with GST",
    duration: "3 Months",
    mode: "Offline",
  },
  {
    code: "09",
    title: "Data Entry and Office Automation",
    duration: "3 Months",
    mode: "Offline",
  },
];
