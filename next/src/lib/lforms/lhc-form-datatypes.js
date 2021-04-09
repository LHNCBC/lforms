// constants
const CONSTANTS = {
  DATA_CONTROL: {
    CONSTRUCTION_ARRAY: "ARRAY",
    CONSTRUCTION_OBJECT: "OBJECT",
    CONSTRUCTION_SIMPLE: "SIMPLE",
    SOURCE_INTERNAL: "INTERNAL",
    EXTERNAL: "EXTERNAL" // not supported yet
  },
  SKIP_LOGIC: {
    ACTION_ENABLE: "show",
    ACTION_DISABLE: "hide", // not supported yet
    STATUS_ENABLED: "target-enabled",
    STATUS_DISABLED: "target-disabled"
  },
  CALCULATION_METHOD: {
    TOTALSCORE: "TOTALSCORE",
    BMI: "BMI",
    BSA: "BSA"
  },
  DATA_TYPE: {
    INT: "INT",
    REAL: "REAL",
    ST: "ST",
    TX: "TX",
    DT: "DT",
    DTM: "DTM",
    TM: "TM",
    CNE: "CNE",
    CWE: "CWE",
    NR: "NR",
    YEAR: "YEAR",
    MONTH: "MONTH",
    DAY: "DAY",
    URL: "URL",
    EMAIL: "EMAIL",
    PHONE: "PHONE",
    SECTION: "SECTION",
    TITLE: "TITLE",
    QTY: "QTY",
    BL: "BL"    // not fully supported yet
    // BIN:    "BIN",   // not supported yet
    // RTO:    "RTO",   // not supported yet
  },
  DISPLAY_MODE: ['lg', 'md', 'sm', 'auto']
};

export default CONSTANTS;