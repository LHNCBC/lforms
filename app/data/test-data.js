/**
 * The form data listed here are for internal tests only. The features present in these forms might not be supported
 * in the future versions of the LForms.
 */

/**
 * Modified USSG-FHT panel data for new tree structure
 */
var FHTData = {
  // this is an example showing the JSON format based on the US Surgeon General family health portrait.
  // form type, required. Other possible types: "SDC"
  type: "LOINC",
  // form code, required, the top-level LOINC item's LOINC code in a panel is listed here.
  code: "54127-6N",
  // form name, required. the top-level LOINC item's name in a panel is listed here.
  name: "USSG-FHT, (with mock-up items for skip logic demo)",
  // predefined template name. optional, if not provided, a default template will be used for certain form "type"
  template: "table",
  // template configuration data. optional, if not provided, a default configuration will be used for the
  // selected template
  templateOptions: {},
  // question items, required, level 1
  items: [
    {"questionCode": "54126-8", "questionCardinality": {"min": "1", "max": "1"}, "question": "Your health information", "answers": "", "dataType": "", "units": "", "header": true,
      // level 2
      "items": [
        {"questionCode": "54125-0", "questionCardinality": {"min": "1", "max": "*"}, "question": "Name", "answers": "", "dataType": "ST", "units": "", "header": false},
        {"questionCode": "54131-8", "questionCardinality": {"min": "1", "max": "1"}, "question": "Gender", "answers": [
          {"text": "Male", "code": "LA2-8"},
          {"text": "Female", "code": "LA3-6"},
          {"text": "Other", "code": "LA46-8", "other": "Please Specify"}
        ], "answerCardinality": {"min": "1", "max": "1"},"dataType": "CNE", "units": "", "header": false},
        {"questionCode": "21112-8", "questionCardinality": {"min": "1", "max": "1"}, "question": "Date of Birth", "answers": "", "dataType": "DT", "units": "", "header": false},
        {"questionCode": "54132-6", "questionCardinality": {"min": "1", "max": "1"}, "question": "Were you born a twin?", "answers": 623, "dataType": "CNE", "units": "", "header": false},
        {"questionCode": "54128-4", "questionCardinality": {"min": "1", "max": "1"}, "question": "Were you adopted?", "answers": 361, "dataType": "CNE", "units": "", "header": false,
          "skipLogic": {"conditions":[{"source": "54125-0", "trigger": {"value": "Alex"}}],
            "action": "show"}
        },
        {"questionCode": "54135-9", "questionCardinality": {"min": "1", "max": "1"}, "question": "Are your parents related to each other in any way other than marriage?", "answers": 361, "dataType": "CNE", "units": "", "header": false},
        {"questionCode": "8302-2", "questionCardinality": {"min": "1", "max": "1"}, "question": "Height", "answerCardinality": {"min": "1", "max": "1"},"codingInstructions": "Try to type 10, 12, 15, 16, 25", "answers": "", "dataType": "REAL", "units": [{"name": "inches", "default": true}, {"name": "centimeters"}], "header": false,
          // level 3
          "items": [
            {"questionCode": "8302-2X", "questionCardinality": {"min": "1", "max": "1"}, "question": "Mock-up item: Shown when Height is 12", "answers": "", "dataType": "REAL", "units": "", "header": false,
              "skipLogic": {"conditions":[{"source": "8302-2", "trigger": {"value": 12}}],
                "action": "show"}
            },
            {"questionCode": "8302-2Y", "questionCardinality": {"min": "1", "max": "1"}, "question": "Mock-up item: Shown when Height >= 10", "answers": "", "dataType": "REAL", "units": "", "header": false,
              "skipLogic": {"conditions":[{"source": "8302-2", "trigger": {"minInclusive": 10}}],
                "action": "show"}
            },
            {"questionCode": "8302-2Z", "questionCardinality": {"min": "1", "max": "1"}, "question": "Mock-up item: Shown when Height >15 and Height <= 20", "answers": "", "dataType": "REAL", "units": "", "header": false,
              "skipLogic": {"conditions":[{"source": "8302-2", "trigger": {"minExclusive": 15, "maxInclusive": 20}}],
                "action": "show"}
            }
          ]
        },
        {"questionCode": "54137-5X", "questionCardinality": {"min": "1", "max": "*"}, "question": "Mock-up section: Shown when Height = 15", "answers": "", "dataType": "", "units": "", "header": true,
          "skipLogic": {"conditions":[{"source": "8302-2", "trigger": {"value": 15}}],
            "action": "show"},
          // level 3
          "items": [
            {"questionCode": "54140-9X", "questionCardinality": {"min": "1", "max": "1"}, "question": "Mock-up sub item #1", "answers": 626, "dataType": "CNE", "units": "", "header": false},
            {"questionCode": "54130-0X", "questionCardinality": {"min": "1", "max": "1"}, "question": "Mock-up sub item #2", "answers": 619, "dataType": "CNE", "units": "", "header": false}
          ]
        },
        {"questionCode": "29463-7", "questionCardinality": {"min": "1", "max": "1"}, "question": "Weight", "answers": "", "dataType": "REAL", "units": [{"name": "lbs", "default": true}, {"name": "kgs"}], "header": false},
        {"questionCode": "39156-5", "questionCardinality": {"min": "1", "max": "1"}, "question": "Mock-up item: Body mass index (BMI) [Ratio]", "answers": "", "dataType": "", "units": "", "header": false, "calculationMethod":{"name":"BMI","value":["29463-7","8302-2"]}},
        {"questionCode": "54134-2", "questionCardinality": {"min": "1", "max": "1"}, "question": "Race", "answerCardinality": {"min": "0", "max": "*"}, "answers": 629, "dataType": "CNE", "units": "", "header": false},
        {"questionCode": "54133-4", "questionCardinality": {"min": "1", "max": "1"}, "question": "Ethnicity", "answerCardinality": {"min": "0", "max": "*"}, "answers": 628, "dataType": "CNE", "units": "", "header": false},
        {"questionCode": "54137-5", "questionCardinality": {"min": "1", "max": "*"}, "question": "Your diseases history", "answers": "", "dataType": "", "units": "", "header": true,
          // level 3
          "items": [
            {"questionCode": "54140-9", "questionCardinality": {"min": "1", "max": "1"}, "question": "Disease or Condition", "answers": 626, "dataType": "CNE", "units": "", "header": false},
            {"questionCode": "54130-0", "questionCardinality": {"min": "1", "max": "1"}, "question": "Age at Diagnosis", "answers": 619, "dataType": "CNE", "units": "", "header": false},
            {"questionCode": "54137-5XA", "questionCardinality": {"min": "1", "max": "*"}, "question": "Mock-up section: Shown when Age at Diagnosis is Pre-Birth", "answers": "", "dataType": "", "units": "", "header": true,
              "skipLogic": {"conditions":[{"source": "54130-0", "trigger": {"code": "LA10402-8"}}],
                "action": "show"},
              // level 4
              "items": [
                {"questionCode": "54140-9XA", "questionCardinality": {"min": "1", "max": "1"}, "question": "Mock-up sub item #A", "answers": null, "dataType": "", "units": "", "header": false},
                {"questionCode": "54130-0XA", "questionCardinality": {"min": "1", "max": "1"}, "question": "Mock-up sub item #B", "answers": null, "dataType": "", "units": "", "header": false}
              ]
            }
          ]
        }
      ]
    },
    // level 1, continue
    {"questionCode": "54114-4", "parentQuestionCode": "", "questionCardinality": {"min": "1", "max": "*"}, "question": "Family member health information", "answers": "", "dataType": "", "units": "", "header": true,
      // level 2
      "items": [
        {"questionCode": "54136-7", "questionCardinality": {"min": "1", "max": "1"}, "question": "Relationship to you", "answers": 621, "dataType": "CNE", "units": "", "header": false},
        {"questionCode": "54138-3", "questionCardinality": {"min": "1", "max": "*"}, "question": "Name", "answers": "", "dataType": "ST", "units": "", "header": false},
        {"questionCode": "54123-5", "questionCardinality": {"min": "1", "max": "1"}, "question": "Gender", "answers": [
          {"text": "Male", "code": "LA2-8"},
          {"text": "Female", "code": "LA3-6"},
          {"text": "Other", "code": "LA46-8", "other": "Please Specify"}
        ], "dataType": "CNE", "units": "", "header": false},
        {"questionCode": "54139-1", "questionCardinality": {"min": "1", "max": "1"}, "question": "Living?", "answers": 624, "dataType": "CNE", "units": "", "header": false,
          // level 3
          "items": [
            {"questionCode": "54124-3", "questionCardinality": {"min": "1", "max": "1"}, "question": "Date of Birth", "answers": "", "dataType": "DT", "units": "", "header": false,
              "skipLogic": {"conditions":[{"source": "54139-1", "trigger": {"code": "LA33-6"}}],
                "action": "show"}
            },
            {"questionCode": "54141-7", "questionCardinality": {"min": "1", "max": "1"}, "question": "Age", "answers": "", "dataType": "REAL", "units": "", "header": false,
              "skipLogic": {"conditions":[{"source": "54139-1", "trigger": {"code": "LA33-6"}}],
                "action": "show"}
            },
            {"questionCode": "54112-8", "questionCardinality": {"min": "1", "max": "1"}, "question": "Cause of Death", "answers": 627, "dataType": "CNE", "units": "", "header": false,
              "skipLogic": {"conditions":[{"source": "54139-1", "trigger": {"code": "LA32-8"}}],
                "action": "show"}
            },
            {"questionCode": "54113-6", "questionCardinality": {"min": "1", "max": "1"}, "question": "Age at Death", "answers": 619, "dataType": "CNE", "units": "", "header": false,
              "skipLogic": {"conditions":[{"source": "54139-1", "trigger": {"code": "LA32-8"}}],
                "action": "show"}
            }
          ]
        },
        // level 2, continue
        {"questionCode": "54121-9", "questionCardinality": {"min": "1", "max": "1"}, "question": "Was this person born a twin?", "answers": 623, "dataType": "CNE", "units": "", "header": false},
        {"questionCode": "54122-7", "questionCardinality": {"min": "1", "max": "1"}, "question": "Was this person adopted?", "answers": 361, "dataType": "CNE", "units": "", "header": false},
        {"questionCode": "54119-3", "questionCardinality": {"min": "1", "max": "1"}, "question": "Race", "answerCardinality": {"min": "0", "max": "*"}, "answers": 629, "dataType": "CNE", "units": "", "header": false},
        {"questionCode": "54120-1", "questionCardinality": {"min": "1", "max": "1"}, "question": "Ethnicity", "answerCardinality": {"min": "0", "max": "*"}, "answers": 628, "dataType": "CNE", "units": "", "header": false},
        {"questionCode": "54117-7", "questionCardinality": {"min": "1", "max": "*"}, "question": "This family member's history of disease", "answers": "", "dataType": "", "units": "", "header": true,
          // level 3
          "items":[
            {"questionCode": "54116-9", "questionCardinality": {"min": "1", "max": "1"}, "question": "Disease or Condition", "answers": 626, "dataType": "CNE", "units": "", "header": false},
            {"questionCode": "54115-1", "questionCardinality": {"min": "1", "max": "1"}, "question": "Age at Diagnosis", "answers": 619, "dataType": "CNE", "units": "", "header": false},
            {"questionCode": "8302-2", "questionCardinality": {"min": "1", "max": "1"}, "question": "Mock-up item: Height", "codingInstructions": "", "answers": "", "dataType": "REAL", "units": [{"name": "inches", "default": true}, {"name": "centimeters"}], "header": false},
            {"questionCode": "29463-7", "questionCardinality": {"min": "1", "max": "1"}, "question": "Mock-up item: Weight", "answers": "", "dataType": "REAL", "units": [{"name": "lbs", "default": true}, {"name": "kgs"}], "header": false},
            {"questionCode": "39156-5", "questionCardinality": {"min": "1", "max": "1"}, "question": "Mock-up item: Body mass index (BMI) [Ratio]", "answers": "", "dataType": "", "units": "", "header": false, "calculationMethod":{"name":"BMI","value":["29463-7","8302-2"]}}
          ]
        }
      ]
    }
  ],

  //answer list could be embedded directly in the "answers" field in "items", or,
  //all answer lists could be merged together in a separate "answerLists" object by creating an answer list id for
  //each list, as listed below, so that duplicated answer lists only need to be included once.
  answerLists: {
    "622": [
      {"text": "Male", "code": "LA2-8"},
      {"text": "Female", "code": "LA3-6"},
      {"text": "Other", "code": "LA46-8", "other": "Please Specify"}
    ],
    "623": [
      {"text": "Yes - Identical (Same)", "code": "LA10427-5", "label": "A"},
      {"text": "Yes - Fraternal (Different)", "code": "LA10428-3", "label": "B"},
      {"text": "No", "code": "LA32-8", "label": "C"}
    ],
    "361": [
      {"text": "Yes", "code": "LA33-6"},
      {"text": "No", "code": "LA32-8"}
    ],
    "629": [
      {"text": "American Indian or Alaska Native", "code": "LA10608-0"},
      {"text": "Asian", "code": "LA6156-9"},
      {"text": "-- Asian Indian", "code": "LA10614-8"},
      {"text": "-- Chinese", "code": "LA10615-5"},
      {"text": "-- Filipino", "code": "LA10616-3"},
      {"text": "-- Japanese", "code": "LA10617-1"},
      {"text": "-- Korean", "code": "LA10618-9"},
      {"text": "-- Vietnamese", "code": "LA10620-5"},
      {"text": "-- Other Asian", "code": "LA10619-7"},
      {"text": "Black or African American", "code": "LA10610-6"},
      {"text": "Native Hawaiian or Other Pacific Islander", "code": "LA10611-4"},
      {"text": "-- Native Hawaiian", "code": "LA10623-9"},
      {"text": "-- Guamanian", "code": "LA10622-1"},
      {"text": "-- Chamorro", "code": "LA10621-3"},
      {"text": "-- Samoan", "code": "LA10625-4"},
      {"text": "-- Other Pacific Islander", "code": "LA10624-7"},
      {"text": "White", "code": "LA4457-3"},
      {"text": "Other/Unknown/Refuse To Answer", "code": "LA10613-0"}
    ],
    "628": [
      {"text": "Hispanic or Latino", "code": "LA6214-6"},
      {"text": "-- Central American", "code": "LA10599-1"},
      {"text": "-- Cuban", "code": "LA10600-7"},
      {"text": "-- Dominican(Republic)", "code": "LA10601-5"},
      {"text": "-- Mexican", "code": "LA10602-3"},
      {"text": "-- Puerto Rican", "code": "LA10605-6"},
      {"text": "-- South American", "code": "LA10606-4"},
      {"text": "-- Other Latin American", "code": "LA10604-9"},
      {"text": "-- Other Hispanic/Latino/Spanish", "code": "LA10603-1"},
      {"text": "Non-Hispanic or Latino", "code": "LA10597-5"},
      {"text": "Ashkenazi Jewish", "code": "LA10598-3"},
      {"text": "Unknown/No answer", "code": "LA10607-2"}
    ],
    "626": [
      {"text": "Blood Clots", "code": "LA10533-0"},
      {"text": "-- Blood Clot in Leg", "code": "LA10572-8"},
      {"text": "-- Blood Clot in Lungs", "code": "LA10573-6"},
      {"text": "Cancer", "code": "LA10524-9"},
      {"text": "-- Bone", "code": "LA10549-6"},
      {"text": "-- Breast Cancer", "code": "LA10536-3"},
      {"text": "-- Colon Cancer", "code": "LA10537-1"},
      {"text": "-- Esophageal Cancer", "code": "LA10548-8"},
      {"text": "-- Gastric Cancer", "code": "LA10547-0"},
      {"text": "-- Kidney Cancer", "code": "LA10541-3"},
      {"text": "-- Leukemia", "code": "LA10545-4"},
      {"text": "-- Lung Cancer", "code": "LA10542-1"},
      {"text": "-- Muscle Cancer", "code": "LA10546-2"},
      {"text": "-- Ovarian Cancer", "code": "LA10539-7"},
      {"text": "-- Prostate Cancer", "code": "LA10538-9"},
      {"text": "-- Skin Cancer", "code": "LA10543-9"},
      {"text": "-- Thyroid Cancer", "code": "LA10540-5"},
      {"text": "-- Uterine Cancer", "code": "LA10544-7"},
      {"text": "-- Other Cancer", "code": "LA10550-4"},
      {"text": "Diabetes", "code": "LA10529-8"},
      {"text": "-- Diabetes Type 1", "code": "LA10551-2"},
      {"text": "-- Diabetes Type 2", "code": "LA10552-0"},
      {"text": "-- Gestational Diabetes", "code": "LA10553-8"},
      {"text": "Gastrointestinal Disease", "code": "LA10532-2"},
      {"text": "-- Crohn's Disease", "code": "LA10554-6"},
      {"text": "-- Irritable Bowel Syndrome", "code": "LA10555-3"},
      {"text": "-- Ulceritive Colitis", "code": "LA10556-1"},
      {"text": "-- Colon Polyps", "code": "LA10557-9"},
      {"text": "Heart Disease", "code": "LA10523-1"},
      {"text": "-- Heart Attack", "code": "LA10558-7"},
      {"text": "High Cholesterol/Hyperlipidemia", "code": "LA10526-4"},
      {"text": "Hypertension", "code": "LA7444-8"},
      {"text": "Kidney Disease", "code": "LA10528-0"},
      {"text": "-- Cystic Kidney Disease", "code": "LA10565-2"},
      {"text": "-- Kidney Disease Present From Birth", "code": "LA10566-0"},
      {"text": "-- Nephrosis", "code": "LA10567-8"},
      {"text": "-- Nephritis", "code": "LA10568-6"},
      {"text": "-- Nephrotic Syndrome", "code": "LA10569-4"},
      {"text": "-- Diabetic Kidney Disease", "code": "LA10570-2"},
      {"text": "-- Other/Unknown", "code": "LA10571-0"},
      {"text": "Lung Disease", "code": "LA10531-4"},
      {"text": "-- COPD", "code": "LA10559-5"},
      {"text": "-- Chronic Bronchitis", "code": "LA10560-3"},
      {"text": "-- Emphysema", "code": "LA10561-1"},
      {"text": "-- Chronic Lower Respiratory Disease", "code": "LA10562-9"},
      {"text": "-- Influenza/Pneumonia", "code": "LA10563-7"},
      {"text": "-- Asthma", "code": "LA10564-5"},
      {"text": "Neurological Disorders", "code": "LA10590-0"},
      {"text": "Osteoporosis", "code": "LA10527-2"},
      {"text": "Psychological Disorders", "code": "LA10535-5"},
      {"text": "-- Anxiety", "code": "LA10574-4"},
      {"text": "-- Bipolar/Manic Depressive Disorder", "code": "LA10575-1"},
      {"text": "-- Depression", "code": "LA10576-9"},
      {"text": "-- Attention Deficit Hyper Activity", "code": "LA10577-7"},
      {"text": "-- Autism", "code": "LA10578-5"},
      {"text": "-- Personality Disorder", "code": "LA10579-3"},
      {"text": "-- Eating Disorder", "code": "LA10580-1"},
      {"text": "-- Obsessive Compulsive Disorder", "code": "LA10581-9"},
      {"text": "-- Panic Disorder", "code": "LA10582-7"},
      {"text": "-- Post Traumatic Stress Disorder", "code": "LA10583-5"},
      {"text": "-- Schizophrenia", "code": "LA10584-3"},
      {"text": "-- Social Phobia", "code": "LA10585-0"},
      {"text": "-- Dementia", "code": "LA10586-8"},
      {"text": "Septicemia", "code": "LA10591-8"},
      {"text": "Stroke/Brain Attack", "code": "LA10522-3"},
      {"text": "Sudden Infant Death Syndrome", "code": "LA10530-6"}
    ],
    "619": [
      {"text": "Pre-Birth", "code": "LA10402-8"},
      {"text": "Newborn", "code": "LA10403-6"},
      {"text": "Infancy", "code": "LA10394-7"},
      {"text": "Childhood", "code": "LA10395-4"},
      {"text": "Adolescence", "code": "LA10404-4"},
      {"text": "20-29", "code": "LA10396-2"},
      {"text": "30-39", "code": "LA10397-0"},
      {"text": "40-49", "code": "LA10398-8"},
      {"text": "50-59", "code": "LA10399-6"},
      {"text": "OVER 60", "code": "LA10400-2"},
      {"text": "Unknown", "code": "LA4489-6"}
    ],
    "621": [
      {"text": "Daughter", "code": "LA10405-1"},
      {"text": "Granddaughter", "code": "LA10406-9"},
      {"text": "Grandson", "code": "LA10407-7"},
      {"text": "Half-brother", "code": "LA10408-5"},
      {"text": "Half-sister", "code": "LA10409-3"},
      {"text": "Maternal Aunt", "code": "LA10410-1"},
      {"text": "Maternal Cousin", "code": "LA10411-9"},
      {"text": "Maternal Grandfather", "code": "LA10412-7"},
      {"text": "Maternal Grandmother", "code": "LA10413-5"},
      {"text": "Maternal Uncle", "code": "LA10414-3"},
      {"text": "Brother", "code": "LA10415-0"},
      {"text": "Father", "code": "LA10416-8"},
      {"text": "Mother", "code": "LA10417-6"},
      {"text": "Sister", "code": "LA10418-4"},
      {"text": "Nephew", "code": "LA10419-2"},
      {"text": "Niece", "code": "LA10420-0"},
      {"text": "Paternal Aunt", "code": "LA10421-8"},
      {"text": "Paternal Cousin", "code": "LA10422-6"},
      {"text": "Paternal Grandfather", "code": "LA10423-4"},
      {"text": "Paternal Grandmother", "code": "LA10424-2"},
      {"text": "Paternal Uncle", "code": "LA10425-9"},
      {"text": "Son", "code": "LA10426-7"}
    ],
    "624": [
      {"text": "Yes", "code": "LA33-6"},
      {"text": "No", "code": "LA32-8"},
      {"text": "Unknown", "code": "LA4489-6"}
    ],
    "627": [
      {"text": "Blood Clots", "code": "LA10533-0"},
      {"text": "-- Blood Clot in Leg", "code": "LA10572-8"},
      {"text": "-- Blood Clot in Lungs", "code": "LA10573-6"},
      {"text": "Cancer", "code": "LA10524-9"},
      {"text": "-- Bone", "code": "LA10549-6"},
      {"text": "-- Breast Cancer", "code": "LA10536-3"},
      {"text": "-- Colon Cancer", "code": "LA10537-1"},
      {"text": "-- Esophageal Cancer", "code": "LA10548-8"},
      {"text": "-- Gastric Cancer", "code": "LA10547-0"},
      {"text": "-- Kidney Cancer", "code": "LA10541-3"},
      {"text": "-- Leukemia", "code": "LA10545-4"},
      {"text": "-- Lung Cancer", "code": "LA10542-1"},
      {"text": "-- Muscle Cancer", "code": "LA10546-2"},
      {"text": "-- Ovarian Cancer", "code": "LA10539-7"},
      {"text": "-- Prostate Cancer", "code": "LA10538-9"},
      {"text": "-- Skin Cancer", "code": "LA10543-9"},
      {"text": "-- Thyroid Cancer", "code": "LA10540-5"},
      {"text": "-- Uterine Cancer", "code": "LA10544-7"},
      {"text": "-- Other Cancer", "code": "LA10550-4"},
      {"text": "Diabetes", "code": "LA10529-8"},
      {"text": "-- Diabetes Type 1", "code": "LA10551-2"},
      {"text": "-- Diabetes Type 2", "code": "LA10552-0"},
      {"text": "-- Gestational Diabetes", "code": "LA10553-8"},
      {"text": "Gastrointestinal Disease", "code": "LA10532-2"},
      {"text": "-- Crohn's Disease", "code": "LA10554-6"},
      {"text": "-- Irritable Bowel Syndrome", "code": "LA10555-3"},
      {"text": "-- Ulceritive Colitis", "code": "LA10556-1"},
      {"text": "-- Colon Polyps", "code": "LA10557-9"},
      {"text": "Heart Disease", "code": "LA10523-1"},
      {"text": "-- Heart Attack", "code": "LA10558-7"},
      {"text": "High Cholesterol/Hyperlipidemia", "code": "LA10526-4"},
      {"text": "Hypertension", "code": "LA7444-8"},
      {"text": "Kidney Disease", "code": "LA10528-0"},
      {"text": "-- Cystic Kidney Disease", "code": "LA10565-2"},
      {"text": "-- Kidney Disease Present From Birth", "code": "LA10566-0"},
      {"text": "-- Nephrosis", "code": "LA10567-8"},
      {"text": "-- Nephritis", "code": "LA10568-6"},
      {"text": "-- Nephrotic Syndrome", "code": "LA10569-4"},
      {"text": "-- Diabetic Kidney Disease", "code": "LA10570-2"},
      {"text": "-- Other/Unknown", "code": "LA10571-0"},
      {"text": "Lung Disease", "code": "LA10531-4"},
      {"text": "-- COPD", "code": "LA10559-5"},
      {"text": "-- Chronic Bronchitis", "code": "LA10560-3"},
      {"text": "-- Emphysema", "code": "LA10561-1"},
      {"text": "-- Chronic Lower Respiratory Disease", "code": "LA10562-9"},
      {"text": "-- Influenza/Pneumonia", "code": "LA10563-7"},
      {"text": "-- Asthma", "code": "LA10564-5"},
      {"text": "Neurological Disorders", "code": "LA10590-0"},
      {"text": "Osteoporosis", "code": "LA10527-2"},
      {"text": "Psychological Disorders", "code": "LA10535-5"},
      {"text": "-- Anxiety", "code": "LA10574-4"},
      {"text": "-- Bipolar/Manic Depressive Disorder", "code": "LA10575-1"},
      {"text": "-- Depression", "code": "LA10576-9"},
      {"text": "-- Attention Deficit Hyper Activity", "code": "LA10577-7"},
      {"text": "-- Autism", "code": "LA10578-5"},
      {"text": "-- Personality Disorder", "code": "LA10579-3"},
      {"text": "-- Eating Disorder", "code": "LA10580-1"},
      {"text": "-- Obsessive Compulsive Disorder", "code": "LA10581-9"},
      {"text": "-- Panic Disorder", "code": "LA10582-7"},
      {"text": "-- Post Traumatic Stress Disorder", "code": "LA10583-5"},
      {"text": "-- Schizophrenia", "code": "LA10584-3"},
      {"text": "-- Social Phobia", "code": "LA10585-0"},
      {"text": "-- Dementia", "code": "LA10586-8"},
      {"text": "Septicemia", "code": "LA10591-8"},
      {"text": "Stroke/Brain Attack", "code": "LA10522-3"},
      {"text": "Sudden Infant Death Syndrome", "code": "LA10530-6"},
      {"text": "Cause of Death", "code": "LA10595-9"},
      {"text": "-- Suicide", "code": "LA10587-6"},
      {"text": "-- Accidental Death", "code": "LA10588-4"},
      {"text": "-- Other/Unexpected", "code": "LA10589-2", "other": "Please Specify"}
    ]
  }
};


/**
 * Modified USSG-FHT panel data for new tree structure, supporting horizontal table layout
 */
var horizontalFHTData = {
  // this is an example showing the JSON format based on the US Surgeon General family health portrait.
  // form type, required. Other possible types: "SDC"
  type: "LOINC",
  // form code, required, the top-level LOINC item's LOINC code in a panel is listed here.
  code: "54127-6H",
  // form name, required. the top-level LOINC item's name in a panel is listed here.
  name: "USSG-FHT, (with mock-up items for horizontal layout demo)",
  // predefined template name. optional, if not provided, a default template will be used for certain form "type"
  template: "form-view-b",
  // template configuration data. optional, if not provided, a default configuration will be used for the selected
  // template. the format/content is not ready for publish yet.
  templateOptions: {},
  // question items, required, level 1
  items: [
    {"questionCode": "54126-8", "questionCardinality": {"min": "1", "max": "1"}, "question": "Your health information", "answers": "", "dataType": "", "units": "", "header": true,
      // level 2
      "items": [
        {"questionCode": "54125-0", "questionCardinality": {"min": "1", "max": "*"}, "question": "Name", "answers": "", "dataType": "ST", "units": "", "header": false},
        {"questionCode": "54131-8", "questionCardinality": {"min": "1", "max": "1"}, "question": "Gender", "answers": [
          {"text": "Male", "code": "LA2-8"},
          {"text": "Female", "code": "LA3-6"},
          {"text": "Other", "code": "LA46-8", "other": "Please Specify"}
        ], "answerCardinality": {"min": "1", "max": "1"},"dataType": "CNE", "units": "", "header": false},
        {"questionCode": "21112-8", "questionCardinality": {"min": "1", "max": "1"}, "question": "Date of Birth", "answers": "", "dataType": "DT", "units": "", "header": false},
        {"questionCode": "54132-6", "questionCardinality": {"min": "1", "max": "1"}, "question": "Were you born a twin?", "answers": 623, "dataType": "CNE", "units": "", "header": false},
        {"questionCode": "54128-4", "questionCardinality": {"min": "1", "max": "1"}, "question": "Were you adopted?", "answers": 361, "dataType": "CNE", "units": "", "header": false},
        {"questionCode": "54135-9", "questionCardinality": {"min": "1", "max": "1"}, "question": "Are your parents related to each other in any way other than marriage?", "answers": 361, "dataType": "CNE", "units": "", "header": false},
        {"questionCode": "8302-2", "questionCardinality": {"min": "1", "max": "1"}, "question": "Height", "answerCardinality": {"min": "1", "max": "1"},"codingInstructions": "Try to type 10, 12, 15, 16, 25", "answers": "", "dataType": "REAL", "units": [{"name": "inches", "default": true}, {"name": "centimeters"}], "header": false,
          // level 3
          "items": [
            {"questionCode": "8302-2X", "questionCardinality": {"min": "1", "max": "1"}, "question": "Mock-up item: Shown when Height is 12", "answers": "", "dataType": "REAL", "units": "", "header": false,
              "skipLogic": {"conditions":[{"source": "8302-2", "trigger": {"value": 12}}],
                "action": "show"}
            },
            {"questionCode": "8302-2Y", "questionCardinality": {"min": "1", "max": "1"}, "question": "Mock-up item: Shown when Height >= 10", "answers": "", "dataType": "REAL", "units": "", "header": false,
              "skipLogic": {"conditions":[{"source": "8302-2", "trigger": {"minInclusive": 10}}],
                "action": "show"}
            },
            {"questionCode": "8302-2Z", "questionCardinality": {"min": "1", "max": "1"}, "question": "Mock-up item: Shown when Height >15 and Height <= 20", "answers": "", "dataType": "REAL", "units": "", "header": false,
              "skipLogic": {"conditions":[{"source": "8302-2", "trigger": {"minExclusive": 15, "maxInclusive": 20}}],
                "action": "show"}
            }
          ]
        },
        {"questionCode": "54137-5X", "questionCardinality": {"min": "1", "max": "*"}, "question": "Mock-up section: Shown when Height = 15", "answers": "", "dataType": "", "units": "", "header": true,
          "skipLogic": {"conditions":[{"source": "8302-2", "trigger": {"value": 15}}],
            "action": "show"},
          // level 3
          "items": [
            {"questionCode": "54140-9X", "questionCardinality": {"min": "1", "max": "1"}, "question": "Mock-up sub item #1", "answers": 626, "dataType": "CNE", "units": "", "header": false},
            {"questionCode": "54130-0X", "questionCardinality": {"min": "1", "max": "1"}, "question": "Mock-up sub item #2", "answers": 619, "dataType": "CNE", "units": "", "header": false}
          ]
        },
        {"questionCode": "29463-7", "questionCardinality": {"min": "1", "max": "1"}, "question": "Weight", "answers": "", "dataType": "REAL", "units": [{"name": "lbs", "default": true}, {"name": "kgs"}], "header": false},
        {"questionCode": "39156-5", "questionCardinality": {"min": "1", "max": "1"}, "question": "Mock-up item: Body mass index (BMI) [Ratio]", "answers": "", "dataType": "", "units": "", "header": false, "calculationMethod":{"name":"BMI","value":["29463-7","8302-2"]}},
        {"questionCode": "54134-2", "questionCardinality": {"min": "1", "max": "1"}, "question": "Race", "answerCardinality": {"min": "0", "max": "*"}, "answers": 629, "dataType": "CNE", "units": "", "header": false},
        {"questionCode": "54133-4", "questionCardinality": {"min": "1", "max": "1"}, "question": "Ethnicity", "answerCardinality": {"min": "0", "max": "*"}, "answers": 628, "dataType": "CNE", "units": "", "header": false},
        {"questionCode": "54137-5", "questionCardinality": {"min": "1", "max": "*"}, "question": "Your diseases history", "answers": "", "dataType": "", "units": "", "header": true,
          // level 3
          "items": [
            {"questionCode": "54140-9", "questionCardinality": {"min": "1", "max": "1"}, "question": "Disease or Condition", "answers": 626, "dataType": "CNE", "units": "", "header": false},
            {"questionCode": "54130-0", "questionCardinality": {"min": "1", "max": "1"}, "question": "Age at Diagnosis", "answers": 619, "dataType": "CNE", "units": "", "header": false}
          ]
        }
      ]
    },
    // level 1, continue
    {"questionCode": "54114-4", "parentQuestionCode": "", "questionCardinality": {"min": "1", "max": "*"}, "question": "Family member health information", "answers": "", "dataType": "", "units": "", "header": true,
      // level 2
      "items": [
        {"questionCode": "54136-7", "questionCardinality": {"min": "1", "max": "1"}, "question": "Relationship to you", "answers": 621, "dataType": "CNE", "units": "", "header": false,
          "skipLogic": {"conditions":[{"source": "54122-7", "trigger": {"code": "LA33-6"}}],
            "action": "show"}
        },
        {"questionCode": "54138-3", "questionCardinality": {"min": "1", "max": "1"}, "question": "Name", "answers": "", "dataType": "ST", "units": "", "header": false},
        {"questionCode": "54123-5", "questionCardinality": {"min": "1", "max": "1"}, "question": "Gender", "answers": [
          {"text": "Male", "code": "LA2-8"},
          {"text": "Female", "code": "LA3-6"},
          {"text": "Other", "code": "LA46-8", "other": "Please Specify"}
        ], "dataType": "CNE", "units": "", "header": false},
        {"questionCode": "54139-1", "questionCardinality": {"min": "1", "max": "1"}, "question": "Living?", "answers": 624, "dataType": "CNE", "units": "", "header": false,
          // level 3
          "items": [
            {"questionCode": "54124-3", "questionCardinality": {"min": "1", "max": "1"}, "question": "Date of Birth", "answers": "", "dataType": "DT", "units": "", "header": false,
              "skipLogic": {"conditions":[{"source": "54139-1", "trigger": {"code": "LA33-6"}}],
                "action": "show"}
            },
            {"questionCode": "54141-7", "questionCardinality": {"min": "1", "max": "1"}, "question": "Age", "answers": "", "dataType": "REAL", "units": "", "header": false,
              "skipLogic": {"conditions":[{"source": "54139-1", "trigger": {"code": "LA33-6"}}],
                "action": "show"}
            },
            {"questionCode": "54112-8", "questionCardinality": {"min": "1", "max": "1"}, "question": "Cause of Death", "answers": 627, "dataType": "CNE", "units": "", "header": false,
              "skipLogic": {"conditions":[{"source": "54139-1", "trigger": {"code": "LA32-8"}}],
                "action": "show"}
            },
            {"questionCode": "54113-6", "questionCardinality": {"min": "1", "max": "1"}, "question": "Age at Death", "answers": 619, "dataType": "CNE", "units": "", "header": false,
              "skipLogic": {"conditions":[{"source": "54139-1", "trigger": {"code": "LA32-8"}}],
                "action": "show"}
            }
          ]
        },
        // level 2, continue
        {"questionCode": "54121-9", "questionCardinality": {"min": "1", "max": "1"}, "question": "Was this person born a twin?", "answers": 623, "dataType": "CNE", "units": "", "header": false},
        {"questionCode": "54122-7", "questionCardinality": {"min": "1", "max": "1"}, "question": "Was this person adopted?", "answers": 361, "dataType": "CNE", "units": "", "header": false},
        {"questionCode": "54119-3", "questionCardinality": {"min": "1", "max": "1"}, "question": "Race", "answerCardinality": {"min": "0", "max": "*"}, "answers": 629, "dataType": "CNE", "units": "", "header": false},
        {"questionCode": "54120-1", "questionCardinality": {"min": "1", "max": "1"}, "question": "Ethnicity", "answerCardinality": {"min": "0", "max": "*"}, "answers": 628, "dataType": "CNE", "units": "", "header": false},
        {"questionCode": "54117-7", "questionCardinality": {"min": "1", "max": "*"}, "question": "This family member's history of disease", "answers": "", "dataType": "", "units": "", "header": true,"layout": "horizontal",
          // level 3
          "items":[
            {"questionCode": "54116-9", "questionCardinality": {"min": "1", "max": "1"}, "question": "Disease or Condition", "answers": 626, "dataType": "CNE", "units": "", "header": false},
            {"questionCode": "54115-1", "questionCardinality": {"min": "1", "max": "1"}, "question": "Age at Diagnosis", "answers": 619, "dataType": "CNE", "units": "", "header": false},
            {"questionCode": "8302-2", "questionCardinality": {"min": "1", "max": "1"}, "question": "Mock-up item: Height", "codingInstructions": "", "answers": "", "dataType": "REAL", "units": [{"name": "inches", "default": true}, {"name": "centimeters"}], "header": false},
            {"questionCode": "29463-7", "questionCardinality": {"min": "1", "max": "1"}, "question": "Mock-up item: Weight", "answers": "", "dataType": "REAL", "units": [{"name": "lbs", "default": true}, {"name": "kgs"}], "header": false},
            {"questionCode": "39156-5", "questionCardinality": {"min": "1", "max": "1"}, "question": "Mock-up item: Body mass index (BMI) [Ratio]", "answers": "", "dataType": "", "units": "", "header": false, "calculationMethod":{"name":"BMI","value":["29463-7","8302-2"]}}
          ]
        },
        {"questionCode": "54119-3R", "questionCardinality": {"min": "1", "max": "1"}, "question": "Race", "answerCardinality": {"min": "0", "max": "*"}, "answers": 629, "dataType": "CNE", "units": "", "header": false,
          "skipLogic": {"conditions":[{"source": "54122-7", "trigger": {"code": "LA33-6"}}],
            "action": "show"}
        }
      ]
    }
  ],
  //answer list could be embedded directly in the "answers" field in "items", or,
  //all answer lists could be merged together in a separate "answerLists" object by creating an answer list id for
  //each list, as listed below, so that duplicated answer lists only need to be included once.
  answerLists: {
    "622": [
      {"text": "Male", "code": "LA2-8"},
      {"text": "Female", "code": "LA3-6"},
      {"text": "Other", "code": "LA46-8", "other": "Please Specify"}
    ],
    "623": [
      {"text": "Yes - Identical (Same)", "code": "LA10427-5", "label": "A"},
      {"text": "Yes - Fraternal (Different)", "code": "LA10428-3", "label": "B"},
      {"text": "No", "code": "LA32-8", "label": "C"}
    ],
    "361": [
      {"text": "Yes", "code": "LA33-6"},
      {"text": "No", "code": "LA32-8"}
    ],
    "629": [
      {"text": "American Indian or Alaska Native", "code": "LA10608-0"},
      {"text": "Asian", "code": "LA6156-9"},
      {"text": "-- Asian Indian", "code": "LA10614-8"},
      {"text": "-- Chinese", "code": "LA10615-5"},
      {"text": "-- Filipino", "code": "LA10616-3"},
      {"text": "-- Japanese", "code": "LA10617-1"},
      {"text": "-- Korean", "code": "LA10618-9"},
      {"text": "-- Vietnamese", "code": "LA10620-5"},
      {"text": "-- Other Asian", "code": "LA10619-7"},
      {"text": "Black or African American", "code": "LA10610-6"},
      {"text": "Native Hawaiian or Other Pacific Islander", "code": "LA10611-4"},
      {"text": "-- Native Hawaiian", "code": "LA10623-9"},
      {"text": "-- Guamanian", "code": "LA10622-1"},
      {"text": "-- Chamorro", "code": "LA10621-3"},
      {"text": "-- Samoan", "code": "LA10625-4"},
      {"text": "-- Other Pacific Islander", "code": "LA10624-7"},
      {"text": "White", "code": "LA4457-3"},
      {"text": "Other/Unknown/Refuse To Answer", "code": "LA10613-0"}
    ],
    "628": [
      {"text": "Hispanic or Latino", "code": "LA6214-6"},
      {"text": "-- Central American", "code": "LA10599-1"},
      {"text": "-- Cuban", "code": "LA10600-7"},
      {"text": "-- Dominican(Republic)", "code": "LA10601-5"},
      {"text": "-- Mexican", "code": "LA10602-3"},
      {"text": "-- Puerto Rican", "code": "LA10605-6"},
      {"text": "-- South American", "code": "LA10606-4"},
      {"text": "-- Other Latin American", "code": "LA10604-9"},
      {"text": "-- Other Hispanic/Latino/Spanish", "code": "LA10603-1"},
      {"text": "Non-Hispanic or Latino", "code": "LA10597-5"},
      {"text": "Ashkenazi Jewish", "code": "LA10598-3"},
      {"text": "Unknown/No answer", "code": "LA10607-2"}
    ],
    "626": [
      {"text": "Blood Clots", "code": "LA10533-0"},
      {"text": "-- Blood Clot in Leg", "code": "LA10572-8"},
      {"text": "-- Blood Clot in Lungs", "code": "LA10573-6"},
      {"text": "Cancer", "code": "LA10524-9"},
      {"text": "-- Bone", "code": "LA10549-6"},
      {"text": "-- Breast Cancer", "code": "LA10536-3"},
      {"text": "-- Colon Cancer", "code": "LA10537-1"},
      {"text": "-- Esophageal Cancer", "code": "LA10548-8"},
      {"text": "-- Gastric Cancer", "code": "LA10547-0"},
      {"text": "-- Kidney Cancer", "code": "LA10541-3"},
      {"text": "-- Leukemia", "code": "LA10545-4"},
      {"text": "-- Lung Cancer", "code": "LA10542-1"},
      {"text": "-- Muscle Cancer", "code": "LA10546-2"},
      {"text": "-- Ovarian Cancer", "code": "LA10539-7"},
      {"text": "-- Prostate Cancer", "code": "LA10538-9"},
      {"text": "-- Skin Cancer", "code": "LA10543-9"},
      {"text": "-- Thyroid Cancer", "code": "LA10540-5"},
      {"text": "-- Uterine Cancer", "code": "LA10544-7"},
      {"text": "-- Other Cancer", "code": "LA10550-4"},
      {"text": "Diabetes", "code": "LA10529-8"},
      {"text": "-- Diabetes Type 1", "code": "LA10551-2"},
      {"text": "-- Diabetes Type 2", "code": "LA10552-0"},
      {"text": "-- Gestational Diabetes", "code": "LA10553-8"},
      {"text": "Gastrointestinal Disease", "code": "LA10532-2"},
      {"text": "-- Crohn's Disease", "code": "LA10554-6"},
      {"text": "-- Irritable Bowel Syndrome", "code": "LA10555-3"},
      {"text": "-- Ulceritive Colitis", "code": "LA10556-1"},
      {"text": "-- Colon Polyps", "code": "LA10557-9"},
      {"text": "Heart Disease", "code": "LA10523-1"},
      {"text": "-- Heart Attack", "code": "LA10558-7"},
      {"text": "High Cholesterol/Hyperlipidemia", "code": "LA10526-4"},
      {"text": "Hypertension", "code": "LA7444-8"},
      {"text": "Kidney Disease", "code": "LA10528-0"},
      {"text": "-- Cystic Kidney Disease", "code": "LA10565-2"},
      {"text": "-- Kidney Disease Present From Birth", "code": "LA10566-0"},
      {"text": "-- Nephrosis", "code": "LA10567-8"},
      {"text": "-- Nephritis", "code": "LA10568-6"},
      {"text": "-- Nephrotic Syndrome", "code": "LA10569-4"},
      {"text": "-- Diabetic Kidney Disease", "code": "LA10570-2"},
      {"text": "-- Other/Unknown", "code": "LA10571-0"},
      {"text": "Lung Disease", "code": "LA10531-4"},
      {"text": "-- COPD", "code": "LA10559-5"},
      {"text": "-- Chronic Bronchitis", "code": "LA10560-3"},
      {"text": "-- Emphysema", "code": "LA10561-1"},
      {"text": "-- Chronic Lower Respiratory Disease", "code": "LA10562-9"},
      {"text": "-- Influenza/Pneumonia", "code": "LA10563-7"},
      {"text": "-- Asthma", "code": "LA10564-5"},
      {"text": "Neurological Disorders", "code": "LA10590-0"},
      {"text": "Osteoporosis", "code": "LA10527-2"},
      {"text": "Psychological Disorders", "code": "LA10535-5"},
      {"text": "-- Anxiety", "code": "LA10574-4"},
      {"text": "-- Bipolar/Manic Depressive Disorder", "code": "LA10575-1"},
      {"text": "-- Depression", "code": "LA10576-9"},
      {"text": "-- Attention Deficit Hyper Activity", "code": "LA10577-7"},
      {"text": "-- Autism", "code": "LA10578-5"},
      {"text": "-- Personality Disorder", "code": "LA10579-3"},
      {"text": "-- Eating Disorder", "code": "LA10580-1"},
      {"text": "-- Obsessive Compulsive Disorder", "code": "LA10581-9"},
      {"text": "-- Panic Disorder", "code": "LA10582-7"},
      {"text": "-- Post Traumatic Stress Disorder", "code": "LA10583-5"},
      {"text": "-- Schizophrenia", "code": "LA10584-3"},
      {"text": "-- Social Phobia", "code": "LA10585-0"},
      {"text": "-- Dementia", "code": "LA10586-8"},
      {"text": "Septicemia", "code": "LA10591-8"},
      {"text": "Stroke/Brain Attack", "code": "LA10522-3"},
      {"text": "Sudden Infant Death Syndrome", "code": "LA10530-6"}
    ],
    "619": [
      {"text": "Pre-Birth", "code": "LA10402-8"},
      {"text": "Newborn", "code": "LA10403-6"},
      {"text": "Infancy", "code": "LA10394-7"},
      {"text": "Childhood", "code": "LA10395-4"},
      {"text": "Adolescence", "code": "LA10404-4"},
      {"text": "20-29", "code": "LA10396-2"},
      {"text": "30-39", "code": "LA10397-0"},
      {"text": "40-49", "code": "LA10398-8"},
      {"text": "50-59", "code": "LA10399-6"},
      {"text": "OVER 60", "code": "LA10400-2"},
      {"text": "Unknown", "code": "LA4489-6"}
    ],
    "621": [
      {"text": "Daughter", "code": "LA10405-1"},
      {"text": "Granddaughter", "code": "LA10406-9"},
      {"text": "Grandson", "code": "LA10407-7"},
      {"text": "Half-brother", "code": "LA10408-5"},
      {"text": "Half-sister", "code": "LA10409-3"},
      {"text": "Maternal Aunt", "code": "LA10410-1"},
      {"text": "Maternal Cousin", "code": "LA10411-9"},
      {"text": "Maternal Grandfather", "code": "LA10412-7"},
      {"text": "Maternal Grandmother", "code": "LA10413-5"},
      {"text": "Maternal Uncle", "code": "LA10414-3"},
      {"text": "Brother", "code": "LA10415-0"},
      {"text": "Father", "code": "LA10416-8"},
      {"text": "Mother", "code": "LA10417-6"},
      {"text": "Sister", "code": "LA10418-4"},
      {"text": "Nephew", "code": "LA10419-2"},
      {"text": "Niece", "code": "LA10420-0"},
      {"text": "Paternal Aunt", "code": "LA10421-8"},
      {"text": "Paternal Cousin", "code": "LA10422-6"},
      {"text": "Paternal Grandfather", "code": "LA10423-4"},
      {"text": "Paternal Grandmother", "code": "LA10424-2"},
      {"text": "Paternal Uncle", "code": "LA10425-9"},
      {"text": "Son", "code": "LA10426-7"}
    ],
    "624": [
      {"text": "Yes", "code": "LA33-6"},
      {"text": "No", "code": "LA32-8"},
      {"text": "Unknown", "code": "LA4489-6"}
    ],
    "627": [
      {"text": "Blood Clots", "code": "LA10533-0"},
      {"text": "-- Blood Clot in Leg", "code": "LA10572-8"},
      {"text": "-- Blood Clot in Lungs", "code": "LA10573-6"},
      {"text": "Cancer", "code": "LA10524-9"},
      {"text": "-- Bone", "code": "LA10549-6"},
      {"text": "-- Breast Cancer", "code": "LA10536-3"},
      {"text": "-- Colon Cancer", "code": "LA10537-1"},
      {"text": "-- Esophageal Cancer", "code": "LA10548-8"},
      {"text": "-- Gastric Cancer", "code": "LA10547-0"},
      {"text": "-- Kidney Cancer", "code": "LA10541-3"},
      {"text": "-- Leukemia", "code": "LA10545-4"},
      {"text": "-- Lung Cancer", "code": "LA10542-1"},
      {"text": "-- Muscle Cancer", "code": "LA10546-2"},
      {"text": "-- Ovarian Cancer", "code": "LA10539-7"},
      {"text": "-- Prostate Cancer", "code": "LA10538-9"},
      {"text": "-- Skin Cancer", "code": "LA10543-9"},
      {"text": "-- Thyroid Cancer", "code": "LA10540-5"},
      {"text": "-- Uterine Cancer", "code": "LA10544-7"},
      {"text": "-- Other Cancer", "code": "LA10550-4"},
      {"text": "Diabetes", "code": "LA10529-8"},
      {"text": "-- Diabetes Type 1", "code": "LA10551-2"},
      {"text": "-- Diabetes Type 2", "code": "LA10552-0"},
      {"text": "-- Gestational Diabetes", "code": "LA10553-8"},
      {"text": "Gastrointestinal Disease", "code": "LA10532-2"},
      {"text": "-- Crohn's Disease", "code": "LA10554-6"},
      {"text": "-- Irritable Bowel Syndrome", "code": "LA10555-3"},
      {"text": "-- Ulceritive Colitis", "code": "LA10556-1"},
      {"text": "-- Colon Polyps", "code": "LA10557-9"},
      {"text": "Heart Disease", "code": "LA10523-1"},
      {"text": "-- Heart Attack", "code": "LA10558-7"},
      {"text": "High Cholesterol/Hyperlipidemia", "code": "LA10526-4"},
      {"text": "Hypertension", "code": "LA7444-8"},
      {"text": "Kidney Disease", "code": "LA10528-0"},
      {"text": "-- Cystic Kidney Disease", "code": "LA10565-2"},
      {"text": "-- Kidney Disease Present From Birth", "code": "LA10566-0"},
      {"text": "-- Nephrosis", "code": "LA10567-8"},
      {"text": "-- Nephritis", "code": "LA10568-6"},
      {"text": "-- Nephrotic Syndrome", "code": "LA10569-4"},
      {"text": "-- Diabetic Kidney Disease", "code": "LA10570-2"},
      {"text": "-- Other/Unknown", "code": "LA10571-0"},
      {"text": "Lung Disease", "code": "LA10531-4"},
      {"text": "-- COPD", "code": "LA10559-5"},
      {"text": "-- Chronic Bronchitis", "code": "LA10560-3"},
      {"text": "-- Emphysema", "code": "LA10561-1"},
      {"text": "-- Chronic Lower Respiratory Disease", "code": "LA10562-9"},
      {"text": "-- Influenza/Pneumonia", "code": "LA10563-7"},
      {"text": "-- Asthma", "code": "LA10564-5"},
      {"text": "Neurological Disorders", "code": "LA10590-0"},
      {"text": "Osteoporosis", "code": "LA10527-2"},
      {"text": "Psychological Disorders", "code": "LA10535-5"},
      {"text": "-- Anxiety", "code": "LA10574-4"},
      {"text": "-- Bipolar/Manic Depressive Disorder", "code": "LA10575-1"},
      {"text": "-- Depression", "code": "LA10576-9"},
      {"text": "-- Attention Deficit Hyper Activity", "code": "LA10577-7"},
      {"text": "-- Autism", "code": "LA10578-5"},
      {"text": "-- Personality Disorder", "code": "LA10579-3"},
      {"text": "-- Eating Disorder", "code": "LA10580-1"},
      {"text": "-- Obsessive Compulsive Disorder", "code": "LA10581-9"},
      {"text": "-- Panic Disorder", "code": "LA10582-7"},
      {"text": "-- Post Traumatic Stress Disorder", "code": "LA10583-5"},
      {"text": "-- Schizophrenia", "code": "LA10584-3"},
      {"text": "-- Social Phobia", "code": "LA10585-0"},
      {"text": "-- Dementia", "code": "LA10586-8"},
      {"text": "Septicemia", "code": "LA10591-8"},
      {"text": "Stroke/Brain Attack", "code": "LA10522-3"},
      {"text": "Sudden Infant Death Syndrome", "code": "LA10530-6"},
      {"text": "Cause of Death", "code": "LA10595-9"},
      {"text": "-- Suicide", "code": "LA10587-6"},
      {"text": "-- Accidental Death", "code": "LA10588-4"},
      {"text": "-- Other/Unexpected", "code": "LA10589-2", "other": "Please Specify"}
    ]
  }
};


// test form for new features
var allInOne =
{ "type": "LOINC",
  "code": "all-in-one",
  "name": "Full-Featured Demo",
  "dataType": null,
  "header": null,
  "units": null,
  "codeSystem": "OTHER",
  "codingInstructions": "NIH/NLM/LHNCBC",
  "copyrightNotice": "A Copyright notice of the form",
  "templateOptions": {
    showFormOptionPanel: true,
    "formHeaderItems": [{
      "question": "Date Done",
      "questionCode": "date_done",
      "dataType": "DT",
      "answers": "",
      "answerCardinality": {"min": "1", "max": "1"},
      "displayControl": {"colCSS": [{"name": "width", "value": "10em"}, {"name": "min-width", "value": "4em"}]},
      "defaultAnswer": "t"
    }, {
      "question": "Time Done",
      "questionCode": "time_done",
      "dataType": "TM",
      "answers": "",
      "displayControl": {"colCSS": [{"name": "width", "value": "12em"}, {"name": "min-width", "value": "4em"}]}
    }, {
      "question": "Where Done",
      "questionCode": "where_done",
      "dataType": "CWE",
      "answers": [{"text": "Home", "code": "1"}, {"text": "Hospital", "code": "2"}, {
        "text": "MD Office",
        "code": "3"
      }, {"text": "Lab", "code": "4"}, {"text": "Other", "code": "5"}],
      "displayControl": {"colCSS": [{"name": "width", "value": "30%"}, {"name": "min-width", "value": "4em"}]}
    }, {
      "question": "Comment",
      "questionCode": "comment",
      "dataType": "ST",
      "answers": "",
      "displayControl": {"colCSS": [{"name": "width", "value": "70%"}, {"name": "min-width", "value": "4em"}]}
    }]
  },
  "items": [
    // for view mode testing
    {
      "questionCode": "q_lg",
      "question": "'lg' view mode",
      "dataType": "INT",
      "displayControl": {
        "viewMode": "lg",
        "css": [{
          "name": "color",
          "value": "red"
        }]
      },
      "units": [{"name": "lbs", "default": true}, {"name": "kgs"}]
    },
    {
      "questionCode": "q_md",
      "question": "'md' view mode",
      "dataType": "INT",
      "displayControl": {
        "viewMode": "md"
      },
      "units": [{"name": "lbs", "default": true}, {"name": "kgs"}]
    },
    {
      "questionCode": "q_sm",
      "question": "'sm' view mode",
      "dataType": "INT",
      "displayControl": {
        "viewMode": "sm"
      },
      "units": [{"name": "lbs", "default": true}, {"name": "kgs"}]
    },
    {
      "questionCode": "q_auto",
      "question": "'auto' view mode",
      "dataType": "INT",
      "displayControl": {
        "viewMode": "auto"
      },
      "units": [{"name": "lbs", "default": true}, {"name": "kgs"}]
    },
    // different data type
    {"questionCode": "type0", "dataType": "", "header": false, "units": null, "codingInstructions": "simple text instructions", "copyrightNotice": "A Copyright notice of the item",
      "questionCardinality": null, "answerCardinality": null, "question": "With empty data type", "answers": null,
      "skipLogic": null, "editable": null, "defaultAnswer": null, "displayControl": null, "calculationMethod": null, "items": null},
    {"questionCode": "type1", "dataType": "BL", "header": false, "units": null, "codingInstructions": "<code>HTML</code> instructions, with a <button>button</button> and a link <a href='http://lforms-demo1.nlm.nih.gov'>LForms Demo 1</a>",
      "questionCardinality": null, "answerCardinality": null, "question": "With data type BL", "answers": null, "questionCodeSystem": "NON_LOINC",
      "skipLogic": null, "editable": null, "defaultAnswer": null, "displayControl": null, "calculationMethod": null, "items": null},
    {"questionCode": "type2", "dataType": "INT", "header": false, "units": null, "codingInstructions": "<code>HTML</code> instructions, with a <button>button</button> and a link <a href='http://lforms-demo2.nlm.nih.gov'>LForms Demo 2</a>",
      "codingInstructionsFormat": "text",
      "copyrightNotice": "not copyrighted",
      "questionCardinality": null, "answerCardinality": null, "question": "With data type INT", "answers": null,
      "skipLogic": null, "editable": null, "defaultAnswer": null, "displayControl": null, "calculationMethod": null, "items": null},
    {"questionCode": "type3", "dataType": "REAL", "header": false, "units":
    null, "codingInstructions": "<code>HTML</code> instructions, with a <button>button</button> and a link <a href='http://lforms-demo3.nlm.nih.gov'>LForms Demo 3</a>",
      "codingInstructionsFormat": "html",
      "copyrightNotice": "not copyrighted",
      "questionCardinality": null, "answerCardinality": null, "question": "With data type REAL", "answers": null,
      "skipLogic": null, "editable": null, "defaultAnswer": null, "displayControl": null, "calculationMethod": null, "items": null},
    {"questionCode": "type4", "dataType": "ST", "header": false, "units": null, "codingInstructions": null,
      "questionCardinality": null, "answerCardinality": null, "question": "With data type ST", "answers": null,
      "skipLogic": null, "editable": null, "defaultAnswer": null, "displayControl": null, "calculationMethod": null, "items": null},
    {"questionCode": "type5", "dataType": "BIN", "header": false, "units": null, "codingInstructions": null,
      "questionCardinality": null, "answerCardinality": null, "question": "With data type BIN", "answers": null,
      "skipLogic": null, "editable": null, "defaultAnswer": null, "displayControl": null, "calculationMethod": null, "items": null},
    {"questionCode": "type6", "dataType": "DT", "header": false, "units": null, "codingInstructions": null,
      "questionCardinality": null, "answerCardinality": null, "question": "With data type DT", "answers": null,
      "skipLogic": null, "editable": null, "defaultAnswer": null, "displayControl": null, "calculationMethod": null, "items": null},
    {"questionCode": "type7", "dataType": "DTM", "header": false, "units": null, "codingInstructions": null,
      "questionCardinality": null, "answerCardinality": null, "question": "With data type DTM", "answers": null,
      "skipLogic": null, "editable": null, "defaultAnswer": null, "displayControl": null, "calculationMethod": null, "items": null},
    {"questionCode": "type8", "dataType": "TM", "header": false, "units": null, "codingInstructions": null,
      "questionCardinality": null, "answerCardinality": null, "question": "With data type TM", "answers": null,
      "skipLogic": null, "editable": null, "defaultAnswer": null, "displayControl": null, "calculationMethod": null, "items": null},
    {"questionCode": "type9", "dataType": "CNE", "header": false, "units": null, "codingInstructions": null,
      "questionCardinality": null, "answerCardinality": null, "question": "With data type CNE", "answers": [
      {"code": "c1", "text": "Answer 1", "other": null},
      {"code": "c2", "text": "Answer 2", "other": null},
      {"code": "c3", "text": "Answer 3", "other": null},
      {"code": "c4", "text": "Other:", "other": true}],
      "skipLogic": null, "editable": null, "defaultAnswer": 'Answer 2', "displayControl": null, "calculationMethod": null, "items": null},
    {"questionCode": "type10", "dataType": "CWE", "header": false, "units": null, "codingInstructions": null,
      "questionCardinality": null, "answerCardinality": null, "question": "With data type CWE", "answers": [
      {"label": "1", "code": "c01", "text": "With a label 1", "score": 1, "other": null},
      {"label": "2", "code": "c02", "text": "With a label 2", "score": 2, "other": null},
      {"label": "3", "code": "c03", "text": "With a label 3", "score": 3, "other": null}],
      "skipLogic": null, "editable": null, "defaultAnswer": null, "displayControl": null, "calculationMethod": null, "items": null},
    {"questionCode": "type11", "dataType": "RTO", "header": false, "units": null, "codingInstructions": null,
      "questionCardinality": null, "answerCardinality": null, "question": "With data type RTO", "answers": null,
      "skipLogic": null, "editable": null, "defaultAnswer": null, "displayControl": null, "calculationMethod": null, "items": null},
    {"questionCode": "type12", "dataType": "QTY", "header": false, "units": null, "codingInstructions": null,
      "questionCardinality": null, "answerCardinality": null, "question": "With data type QTY", "answers": null,
      "skipLogic": null, "editable": null, "defaultAnswer": null, "displayControl": null, "calculationMethod": null, "items": null},
    {"questionCode": "type13", "dataType": "YEAR", "header": false, "units": null, "codingInstructions": null,
      "questionCardinality": null, "answerCardinality": null, "question": "With data type YEAR", "answers": null,
      "skipLogic": null, "editable": null, "defaultAnswer": null, "displayControl": null, "calculationMethod": null, "items": null},
    {"questionCode": "type14", "dataType": "MONTH", "header": false, "units": null, "codingInstructions": null,
      "questionCardinality": null, "answerCardinality": null, "question": "With data type MONTH", "answers": null,
      "skipLogic": null, "editable": null, "defaultAnswer": null, "displayControl": null, "calculationMethod": null, "items": null},
    {"questionCode": "type15", "dataType": "DAY", "header": false, "units": null, "codingInstructions": null,
      "questionCardinality": null, "answerCardinality": null, "question": "With data type DAY", "answers": null,
      "skipLogic": null, "editable": null, "defaultAnswer": null, "displayControl": null, "calculationMethod": null, "items": null},
    {"questionCode": "type16", "dataType": "URL", "header": false, "units": null, "codingInstructions": null,
      "questionCardinality": null, "answerCardinality": null, "question": "With data type URL", "answers": null,
      "skipLogic": null, "editable": null, "defaultAnswer": null, "displayControl": null, "calculationMethod": null, "items": null},
    {"questionCode": "type17", "dataType": "EMAIL", "header": false, "units": null, "codingInstructions": null,
      "questionCardinality": null, "answerCardinality": null, "question": "With data type EMAIL", "answers": null,
      "skipLogic": null, "editable": null, "defaultAnswer": null, "displayControl": null, "calculationMethod": null, "items": null},
    {"questionCode": "type18", "dataType": "PHONE", "header": false, "units": null, "codingInstructions": null,
      "questionCardinality": null, "answerCardinality": null, "question": "With data type PHONE", "answers": null,
      "skipLogic": null, "editable": null, "defaultAnswer": null, "displayControl": null, "calculationMethod": null, "items": null},
    {"questionCode": "type19", "dataType": "TX", "header": false, "units": null, "codingInstructions": null,
      "questionCardinality": null, "answerCardinality": null, "question": "With data type TX", "answers": null,
      "skipLogic": null, "editable": null, "defaultAnswer": null, "displayControl": null, "calculationMethod": null, "items": null},


    // multi-select CNE
    {"questionCode": "multiSelectCNE", "dataType": "CNE", "header": false, "units": null, "codingInstructions": null,
      "questionCardinality": null, "answerCardinality": {"min": "0", "max": "*"}, "question": "Multi Selection on CNE", "answers": [
      {"code": "c1", "text": "Answer 1"},
      {"code": "c2", "text": "Answer 2"},
      {"code": "c3", "text": "Answer 3"},
      {"code": "c4", "text": "Answer 4"}],
      "skipLogic": null, "editable": null, "defaultAnswer": null, "displayControl": null, "calculationMethod": null, "items": null},
    // multi-select CWE
    {"questionCode": "multiSelectCWE", "dataType": "CWE", "header": false, "units": null, "codingInstructions": null,
      "questionCardinality": null, "answerCardinality": {"min": "0", "max": "*"}, "question": "Multi Selection on CWE", "answers": [
      {"code": "c1", "text": "Answer 1"},
      {"code": "c2", "text": "Answer 2"},
      {"code": "c3", "text": "Answer 3"},
      {"code": "c4", "text": "Answer 4"}],
      "skipLogic": null, "editable": null, "defaultAnswer": null, "displayControl": null, "calculationMethod": null, "items": null},


    // skip logic, controlling sibling items
    // skip logic, controlling sibling headers
    {"questionCode": "slSource1", "dataType": "INT", "header": false, "units": null, "codingInstructions": "1 to show T1; >=2 to show T2; <=5 to show header T3, and its subitmes T4 and T5.",
      "questionCardinality": null, "answerCardinality": null, "question": "Skip Logic Source #1", "answers": null,
      "editable": null, "defaultAnswer": null, "displayControl": null, "calculationMethod": null, "items": null},
    {"questionCode": "slTargetItem1", "dataType": "INT", "header": false, "units": null, "codingInstructions": null,
      "questionCardinality": null, "answerCardinality": null, "question": "T1: Shown when 'Skip Logic Source #1' == 1", "answers": null,
      "skipLogic": {"conditions":[{"source": "slSource1", "trigger": {"value": 1}}],
        "action": "show"},
      "editable": null, "defaultAnswer": null, "displayControl": null, "calculationMethod": null, "items": null},
    {"questionCode": "slTargetItem2", "dataType": "INT", "header": false, "units": null, "codingInstructions": null,
      "questionCardinality": null, "answerCardinality": null, "question": "T2: Shown when 'Skip Logic Source #1' > 1", "answers": null,
      "skipLogic": {"conditions":[{"source": "slSource1", "trigger": {"minInclusive": 2}}],
        "action": "show"},
      "editable": null, "defaultAnswer": null, "displayControl": null, "calculationMethod": null, "items": null},
    {"questionCode": "slTargetHeader1", "dataType": "", "header": true, "units": null, "codingInstructions": null,
      "questionCardinality": null, "answerCardinality": null, "question": "T3: Shown when 'Skip Logic Source #1' <= 5", "answers": null,
      "skipLogic": {"conditions":[{"source": "slSource1", "trigger": {"maxInclusive": 5}}],
        "action": "show"},
      "editable": null, "defaultAnswer": null, "displayControl": null, "calculationMethod": null,
      "items": [
        {"questionCode": "slTargetSubItem1", "dataType": "INT", "header": false, "units": null, "codingInstructions": null,
          "questionCardinality": null, "answerCardinality": null, "question": "T4: Shown when my section header is shown", "answers": null,
          "skipLogic": null, "editable": null, "defaultAnswer": null, "displayControl": null, "calculationMethod": null, "items": null},
        {"questionCode": "slTargetSubItem2","dataType": "INT", "header": false, "units": null, "codingInstructions": null,
          "questionCardinality": null, "answerCardinality": null, "question": "T5: Shown when my section header is shown", "answers": null,
          "skipLogic": null, "editable": null, "defaultAnswer": null, "displayControl": null, "calculationMethod": null, "items": null}
      ]
    },


    // skip logic, with logic ALL
    {"questionCode": "slALLSource1", "dataType": "INT", "header": false, "units": null, "questionCardinality": null, "answerCardinality": null, "question": "Source #1 (ALL)", "answers": null,
      "editable": null, "defaultAnswer": null, "displayControl": null, "calculationMethod": null, "items": null},
    {"questionCode": "slALLSource2", "dataType": "INT", "header": false, "units": null, "questionCardinality": null, "answerCardinality": null, "question": "Source #2 (ALL)", "answers": null,
      "editable": null, "defaultAnswer": null, "displayControl": null, "calculationMethod": null, "items": null},
    {"questionCode": "slALLTargetItem", "dataType": "INT", "header": false, "units": null, "codingInstructions": null,
      "questionCardinality": null, "answerCardinality": null, "question": "Shown when 'Source #1 (ALL)' == 1 AND Shown when 'Source #2 (ALL)' == 2 ", "answers": null,
      "skipLogic": {"conditions":[{"source": "slALLSource1", "trigger": {"value": 1}}, {"source": "slALLSource2", "trigger": {"value": 2}}],
        "action": "show", "logic": "ALL"},
      "editable": null, "defaultAnswer": null, "displayControl": null, "calculationMethod": null, "items": null},

    // skip logic, with logic ANY
    {"questionCode": "slANYSource1", "dataType": "INT", "header": false, "units": null, "questionCardinality": null, "answerCardinality": null, "question": "Source #1 (ANY)", "answers": null,
      "editable": null, "defaultAnswer": null, "displayControl": null, "calculationMethod": null, "items": null},
    {"questionCode": "slANYSource2", "dataType": "INT", "header": false, "units": null, "questionCardinality": null, "answerCardinality": null, "question": "Source #2 (ANY)", "answers": null,
      "editable": null, "defaultAnswer": null, "displayControl": null, "calculationMethod": null, "items": null},
    {"questionCode": "slANYTargetItem", "dataType": "INT", "header": false, "units": null, "codingInstructions": null,
      "questionCardinality": null, "answerCardinality": null, "question": "Shown when 'Source #1 (ANY)' == 1 OR Shown when 'Source #2 (ANY)' == 2 ", "answers": null,
      "skipLogic": {"conditions":[{"source": "slANYSource1", "trigger": {"value": 1}}, {"source": "slANYSource2", "trigger": {"value": 2}}],
        "action": "show", "logic": "ANY"},
      "editable": null, "defaultAnswer": null, "displayControl": null, "calculationMethod": null, "items": null},

    // skip logic, within a repeating section
    {"questionCode": "rpSource2", "dataType": "INT", "header": false, "units": null, "codingInstructions": "2 to show T2",
      "questionCardinality": null, "answerCardinality": null, "question": "Skip Logic Source (repeating) #2", "answers": null,
      "editable": null, "defaultAnswer": null, "displayControl": null, "calculationMethod": null, "items": null},
    {"questionCode": "repeatingSection1", "header": true, "question": "A Repeating Section","questionCardinality":{"max": "*", "min": "1"},
      "items": [
        {"questionCode": "rpSource1", "dataType": "INT", "header": false, "units": null, "codingInstructions": "1 to show T1; <=5 to show header T3, and its subitem T4.",
          "questionCardinality": null, "answerCardinality": null, "question": "Skip Logic Source (repeating) #1", "answers": null,
          "editable": null, "defaultAnswer": null, "displayControl": null, "calculationMethod": null, "items": null},
        {"questionCode": "rpTargetItem1", "dataType": "INT", "header": false, "units": null, "codingInstructions": null,
          "questionCardinality": null, "answerCardinality": null, "question": "T1: Shown when 'Skip Logic Source (repeating) #1' == 1", "answers": null,
          "skipLogic": {"conditions":[{"source": "rpSource1", "trigger": {"value": 1}}],
            "action": "show"},
          "editable": null, "defaultAnswer": null, "displayControl": null, "calculationMethod": null, "items": null},
        {"questionCode": "rpTargetItem2", "dataType": "INT", "header": false, "units": null, "codingInstructions": null,
          "questionCardinality": null, "answerCardinality": null, "question": "T2: Shown when 'Skip Logic Source (repeating) #2' == 2", "answers": null,
          "skipLogic": {"conditions":[{"source": "rpSource2", "trigger": {"value": 2}}],
            "action": "show"},
          "editable": null, "defaultAnswer": null, "displayControl": null, "calculationMethod": null, "items": null},
        {"questionCode": "rpTargetHeader1", "dataType": "", "header": true, "units": null, "codingInstructions": null,
          "questionCardinality": null, "answerCardinality": null, "question": "T3: Shown when 'Skip Logic Source (repeating) #1' <= 5", "answers": null,
          "skipLogic": {"conditions":[{"source": "rpSource1", "trigger": {"maxInclusive": 5}}],
            "action": "show"},
          "editable": null, "defaultAnswer": null, "displayControl": null, "calculationMethod": null,
          "items": [
            {"questionCode": "rpTargetSubItem1", "dataType": "INT", "header": false, "units": null, "codingInstructions": null,
              "questionCardinality": null, "answerCardinality": null, "question": "T4: Shown when my section header is shown", "answers": null,
              "skipLogic": null, "editable": null, "defaultAnswer": null, "displayControl": null, "calculationMethod": null, "items": null}
          ]
        }
      ]
    },

    {
      "questionCode": "dataControlExamples",
      "header": true,
      "question": "'dataControl' examples",
      "items": [
        // a search item that returns extra data (a list) in 'STRENGTHS_AND_FORMS' attribute of the data model.
        {
          "questionCode":"itemWithExtraData",
          "dataType":"CNE",
          "header":false,
          "question":"Drug (with extra data of strengths and forms)",
          "externallyDefined":"https://clin-table-search.lhc.nlm.nih.gov/api/rxterms/v3/search?ef=STRENGTHS_AND_FORMS,RXCUIS&autocomp=1"
        },
        //an item that gets the extra LIST data whenever the source item has a data changes
        {
          "questionCode": "controlledItem_LIST",
          "dataType": "CNE",
          "header": false,
          "question": "Strengths and Forms (from 'Drug')",
          "dataControl": [
            {
              "source": {
                "sourceType":"INTERNAL",
                "sourceItemCode":"itemWithExtraData"
              },
              "construction":"ARRAY",
              "dataFormat":{"code": "value.data.RXCUIS", "text": "value.data.STRENGTHS_AND_FORMS"},
              "onAttribute":"answers"
            }
          ]
        },
        //an item that gets the extra TEXT data whenever the source item has a data changes
        {
          "questionCode": "controlledItem_TEXT",
          "dataType": "ST",
          "header": false,
          "question": "The First Strength (from 'Drugs')",
          "dataControl": [
            {
              "source": {
                // "sourceType":"INTERNAL",  // sourceType is optional. Data control should work without it.
                "sourceItemCode":"itemWithExtraData"
              },
              "construction":"SIMPLE",
              "dataFormat": "value.data.STRENGTHS_AND_FORMS[0]",
              "onAttribute":"value"
            }
          ]
        }

        ////an item that gets the external LIST data whenever the source item has a data changes
        //{
        //  "questionCode": "controlledItemTestURL_LIST",
        //  "dataType": "CNE",
        //  "header": false,
        //  "question": "A Strength List (Through URL)",
        //  "dataControl": [
        //    {
        //      "source": {
        //        "sourceType": "EXTERNAL",
        //        "sourceItemCode": "itemWithExtraData",
        //        "url": "https://clin-table-search.lhc.nlm.nih.gov/api/rxterms/v3/search?ef=STRENGTHS_AND_FORMS,RXCUIS&authenticity_token=&autocomp=1",
        //        "urlOptions": [{"parameter": "terms", "data": "value.text"}],
        //      },
        //      "construction": "ARRAY"
        //      "dataFormat": {"code": "value.RXCUIS", "text": "value.STRENGTHS_AND_FORMS"}
        //      "onAttribute": "answers"
        //    }
        //  ],
        //},
        ////an item that gets the external TEXT data whenever the source item has a data changes
        //{
        //  "questionCode": "controlledItemTestURL_TEXT",
        //  "dataType": "ST",
        //  "header": false,
        //  "question": "The First Strength(Through URL)",
        //  "dataControl": [
        //    {
        //      "source": {
        //        "sourceType": "EXTERNAL",
        //        "sourceItemCode": "itemWithExtraData",
        //        "url": "https://clin-table-search.lhc.nlm.nih.gov/api/rxterms/v3/search?ef=STRENGTHS_AND_FORMS,RXCUIS&authenticity_token=&autocomp=1",
        //        "urlOptions": [{"parameter": "terms", "data": "value.text"}],
        //      },
        //      "construction": "SIMPLE"
        //      "dataFormat": "value.STRENGTHS_AND_FORMS[0]"
        //      "onAttribute": "value"
        //    }
        //  ],
        //}
      ]

    },


    // a new dataType for a special header that has no children but divides questions into upper and lower sections
    {
      "questionCode": "titleHeader",
      "question": "This is a TITLE. It looks like a section header but has no children",
      "dataType": "TITLE",
      "header": true
    },

    {"questionCode": "cardinalityControl",
      "question": "This controls the initial number of rows in the horizontal table below",
      "dataType": "CNE",
      "answers": [
        {"code": "c1", "text": "1 row, no repeating",    "questionCardinality": {"min": "1", "max": "1"}},
        {"code": "c2", "text": "1 row, repeating",       "questionCardinality": {"min": "1", "max": "*"}},
        {"code": "c3", "text": "2 rows, no repeating",  "questionCardinality": {"min": "2", "max": "2"}},
        {"code": "c4", "text": "2 rows, repeating",      "questionCardinality": {"min": "2", "max": "*"}},
        {"code": "c5", "text": "2 rows, repeating, 5 rows max",  "questionCardinality": {"min": "2", "max": "5"}}],
    },
    // a horizontal table, non-repeatable
    {"questionCode": "horizontalTable", "questionCardinality": {"min": "1", "max": "1"},
      "question": "A non-repeating horizontal table", "header": true, "layout": "horizontal",
      "dataControl": [
        {
          "source": {
            "sourceType":"INTERNAL",
            "sourceItemCode":"cardinalityControl"
          },
          "construction":"SIMPLE",
          "dataFormat": "value.questionCardinality",
          "onAttribute":"questionCardinality"
        }
      ],
      "items":[
        {"questionCode": "colA", "question": "A ST", "dataType": "ST",
          "displayControl": {
            "colCSS": [{"name": "width", "value":"25%"},
                    {"name": "min-width", "value":"10%"}]
          }
        },
        {"questionCode": "colB", "question": "A TX", "dataType": "TX",
          "displayControl": {
            "colCSS": [{"name": "width", "value":"25%"},
                    {"name": "min-width", "value":"15%"}]
          }
        },
        {"questionCode": "colC", "question": "A CNE", "dataType": "CNE",
          "answers": [
            {"code": "c1", "text": "Answer 1", "other": null},
            {"code": "c2", "text": "Answer 2", "other": null},
            {"code": "c3", "text": "Answer 3", "other": null},
            {"code": "c4", "text": "Other:", "other": true}
          ],
          "displayControl": {
            "colCSS": [{"name": "width", "value":"50%"}]
          }
        }
      ]
    },

    // A list with headers
    {"questionCode": "listWHeaders", "question": "A list with headers",
     "dataType": "CWE",
     "answers": [
       {"code": "food", "text": "Food allergies"},
       {"code": "FOOD-2", "text": "Chocolate",
        "parentAnswerCode": "food"},
       {"code": "FOOD-22", "text": "Crab",
        "parentAnswerCode": "food"},
       {"code": "environmental", "text": "Environmental allergies"},
       {"code": "OTHR-18", "text": "Cat",
        "parentAnswerCode": "environmental"},
       {"code": "OTHR-5", "text": "Cold Weather",
        "parentAnswerCode": "environmental"}
     ]
    },
    // readonly (editable:"0") on ST
    {
      "questionCode": "readonlyST",
      "dataType": "ST",
      "question": "editable='0' data type ST",
      "editable": "0"
    },
    // readonly (editable:"0") on CNE, single selection
    {
      "questionCode": "readonlyCNE-s",
      "dataType": "CNE",
      "question": "editable='0' data type CNE, single selection",
      "editable": "0",
      "answerCardinality": {"min": "0", "max": "1"},
      "value": {"code": "c1", "text": "Answer 1", "other": null},
      "answers": [
        {"code": "c1", "text": "Answer 1", "other": null},
        {"code": "c2", "text": "Answer 2", "other": null},
        {"code": "c3", "text": "Answer 3", "other": null},
        {"code": "c4", "text": "Other:", "other": true}]
    },
    // readonly (editable:"0") on CWE, multiple selections
    {
      "questionCode": "readonlyCWE-m",
      "dataType": "CNE",
      "question": "editable='0' data type CWE, multiple selections",
      "editable": "0",
      "answerCardinality": {"min": "0", "max": "*"},
      "answers": [
        {"code": "c1", "text": "Answer 1", "other": null},
        {"code": "c2", "text": "Answer 2", "other": null},
        {"code": "c3", "text": "Answer 3", "other": null},
        {"code": "c4", "text": "Other:", "other": true}]
    },
    // readonly (editable:"0") on CNE, single selection, radio button
    {
      "questionCode": "readonlyCNE-sb",
      "dataType": "CNE",
      "question": "editable='0' data type CNE, single selection, radio button",
      "editable": "0",
      "answerCardinality": {"min": "0", "max": "1"},
      "value": {"code": "c2", "text": "Answer 2", "other": null},
      "displayControl": {"answerLayout": {"type":"RADIO_CHECKBOX", "columns": "1"}},
      "answers": [
        {"code": "c1", "text": "Answer 1", "other": null},
        {"code": "c2", "text": "Answer 2", "other": null},
        {"code": "c3", "text": "Answer 3", "other": null},
        {"code": "c4", "text": "Other:", "other": true}]
    },
    // readonly (editable:"0") on CWE, multiple selections, check boxes
    {
      "questionCode": "readonlyCWE-mb",
      "dataType": "CNE",
      "question": "editable='0' data type CWE, multiple selections, checkboxes",
      "editable": "0",
      "answerCardinality": {"min": "0", "max": "*"},
      "displayControl": {"answerLayout": {"type":"RADIO_CHECKBOX", "columns": "1"}},
      "answers": [
        {"code": "c1", "text": "Answer 1", "other": null},
        {"code": "c2", "text": "Answer 2", "other": null},
        {"code": "c3", "text": "Answer 3", "other": null},
        {"code": "c4", "text": "Other:", "other": true}]
    },



    // skip logic, controlling child items and headers (one level below)
    // skip logic, controlling descendant items and headers (two levels below)

    // skip logic, controlling repeating sibling items
    // skip logic, controlling repeating sibling headers
    // skip logic, controlling repeating child items and headers (one level below)
    // skip logic, controlling repeating descendant items and headers (two levels below)

    // skip logic, one instance of repeating item (as source) controlling sibling items/headers and descendants items/headers

    // skip logic, one instance of repeating item (as source) controlling repeating sibling items/headers and repeating descendant items/headers

    // editable: readonly(0), writable(1), or readonly for existing data, writable for new data(2)


    // repeating items on level 1
    // bmi rule

    // level 2 sub section 1, non-repeating -- a
    // repeating items on level 2
    // skip logic rule

    // level 3 sub section 1, non-repeating ---- aa
    // repeating items on level 3
    // answers,
    // multiple answers
    // skip logic rule
    // bmi rule

    // level 3 sub section 2, repeating, with everything in (aa) ---- ab

    // level 2 sub section 2, repeating, with everything in (a) -- b

    // total score

  ]};


var validationTestForm = {
  "type": "LOINC",
  "code": "validationTest",
  "name": "Validation Test",
  "items": [
    {"questionCode": "BL", "dataType": "BL", "restrictions":{},"answerCardinality": null, "question": "BL"}, // not implemented
    {"questionCode": "INT", "dataType": "INT", "restrictions":{},"answerCardinality": null, "question": "INT"},
    {"questionCode": "REAL", "dataType": "REAL", "restrictions":{},"answerCardinality": null, "question": "REAL"},
    {"questionCode": "PHONE", "dataType": "PHONE", "restrictions":{},"answerCardinality": null, "question": "PHONE"},
    {"questionCode": "EMAIL", "dataType": "EMAIL", "restrictions":{},"answerCardinality": null, "question": "EMAIL"},
    {"questionCode": "URL", "dataType": "URL", "restrictions":{},"answerCardinality": null, "question": "URL"},
    {"questionCode": "TM", "dataType": "TM", "restrictions":{},"answerCardinality": null, "question": "TM"}, // not implemented
    {"questionCode": "YEAR", "dataType": "YEAR", "restrictions":{},"answerCardinality": null, "question": "YEAR"},
    {"questionCode": "MONTH", "dataType": "MONTH", "restrictions":{},"answerCardinality": null, "question": "MONTH"},
    {"questionCode": "DAY", "dataType": "DAY", "restrictions":{},"answerCardinality": null, "question": "DAY"},
    {"questionCode": "NR", "dataType": "NR", "restrictions":{},"answerCardinality": null, "question": "NR"},
    {"questionCode": "ST", "dataType": "ST", "restrictions":null,"answerCardinality": null, "question": "ST with no restrictions"},

    {"questionCode": "INT1", "dataType": "INT", "restrictions":{"minInclusive": 5},"answerCardinality": null, "question": "INT with minInclusive restrictions"},
    {"questionCode": "INT2", "dataType": "INT", "restrictions":{"minExclusive": 5},"answerCardinality": null, "question": "INT with minExclusive restrictions"},
    {"questionCode": "INT3", "dataType": "INT", "restrictions":{"maxInclusive": 10},"answerCardinality": null, "question": "INT with maxInclusive restrictions"},
    {"questionCode": "INT4", "dataType": "INT", "restrictions":{"maxExclusive": 10},"answerCardinality": null, "question": "INT with maxExclusive restrictions"},

    {"questionCode": "REAL1", "dataType": "REAL", "restrictions":{"minInclusive": 5},"answerCardinality": null, "question": "REAL with minInclusive restrictions"},
    {"questionCode": "REAL2", "dataType": "REAL", "restrictions":{"minExclusive": 5},"answerCardinality": null, "question": "REAL with minExclusive restrictions"},
    {"questionCode": "REAL3", "dataType": "REAL", "restrictions":{"maxInclusive": 10},"answerCardinality": null, "question": "REAL with maxInclusive restrictions"},
    {"questionCode": "REAL4", "dataType": "REAL", "restrictions":{"maxExclusive": 10},"answerCardinality": null, "question": "REAL with maxExclusive restrictions"},

    {"questionCode": "ST1", "dataType": "ST", "restrictions":{"length": 5},"answerCardinality": null, "question": "ST with length restrictions"},
    {"questionCode": "ST2", "dataType": "ST", "restrictions":{"minLength": 5},"answerCardinality": null, "question": "ST with minLength restrictions"},
    {"questionCode": "ST3", "dataType": "ST", "restrictions":{"maxLength": 10},"answerCardinality": null, "question": "ST with maxLength restrictions"},

    {"questionCode": "INTA", "dataType": "INT", "restrictions":{"minInclusive": 5, "maxExclusive": 10},"answerCardinality": null, "question": "INT with minInclusive, maxExclusive"},
    {"questionCode": "REALA", "dataType": "REAL", "restrictions":{"minInclusive": 5, "maxExclusive": 10},"answerCardinality": null, "question": "REAL with minInclusive, maxExclusive"},
    {"questionCode": "STA", "dataType": "ST", "restrictions":{"maxLength": 10, "minLength": 5, "pattern": "/^[a-z]+$/"},"answerCardinality": null, "question": "ST with maxLength, minLength, pattern"},
    {"questionCode": "externallyDefined1", "dataType": "CNE", "restrictions":{},"answerCardinality":{"max":"1", "min":"1"}, "question": "Externally defined 1",
      "externallyDefined": "https://lforms-service.nlm.nih.gov/dummy/test?var1=1&va2=a%20b"
    },

    {"questionCode": "DT", "dataType": "DT", "restrictions":{},"answerCardinality":{"max":"1", "min":"1"}, "question": "DT"},
    {"questionCode": "ST0", "dataType": "ST", "restrictions":{},"answerCardinality":{"max":"1", "min":"1"}, "question": "ST required"},
    {"questionCode": "CNE1", "dataType": "CNE", "restrictions":{},"answerCardinality":{"max":"1", "min":"1"}, "question": "CNE single required", "answers": [
      {"code": "c1", "text": "Answer 1"},
      {"code": "c2", "text": "Answer 2"},
      {"code": "c3", "text": "Answer 3"}]},
    {"questionCode": "CNE2", "dataType": "CNE", "restrictions":{},"answerCardinality":{"max":"*", "min":"1"}, "question": "CNE multiple required","answers": [
      {"code": "c1", "text": "Answer 1"},
      {"code": "c2", "text": "Answer 2"},
      {"code": "c3", "text": "Answer 3"}]},
    {"questionCode": "CWE1", "dataType": "CWE", "restrictions":{},"answerCardinality":{"max":"1", "min":"1"}, "question": "CWE single required","answers": [
      {"code": "c1", "text": "Answer 1"},
      {"code": "c2", "text": "Answer 2"},
      {"code": "c3", "text": "Answer 3"}]},
    {"questionCode": "CWE2", "dataType": "CWE", "restrictions":{},"answerCardinality":{"max":"*", "min":"1"}, "question": "CWE multiple required","answers": [
      {"code": "c1", "text": "Answer 1"},
      {"code": "c2", "text": "Answer 2"},
      {"code": "c3", "text": "Answer 3"}]}


  ]
};


// a user saved form data with multiple instances of repeating items
var formWithUserData =
{ "type": "LOINC",
  "code": "form-with-user-data",
  "name": "Form with User Data",
  "dataType": null,
  "header": null,
  "units": null,
  "codingInstructions": "NIH/NLM/LHNCBC",
  "copyrightNotice": null,
  "items": [
    // different data type
    {"questionCode": "q1", "header": false, "units": null,
      "codingInstructions": "<code>HTML</code> instructions, with a <button>button</button> and a link <a href='http://lforms-demo.nlm.nih.gov'>LForms Demo</a>",
      "value": "no data type",
      "questionCardinality": null, "answerCardinality": null, "question": "With no data type", "answers": null,
      "skipLogic": null, "editable": null, "defaultAnswer": null, "displayControl": null, "calculationMethod": null, "items": null},
    {"questionCode": "q2", "dataType": "INT", "header": false, "units": null, "codingInstructions": null, "value": 100,
      "questionCardinality": null, "answerCardinality": null, "question": "With data type INT", "answers": null,
      "skipLogic": null, "editable": null, "defaultAnswer": null, "displayControl": null, "calculationMethod": null, "items": null},
    {"questionCode": "q3", "dataType": "ST", "header": false, "units": null, "codingInstructions": null, "value": "user input value",
      "questionCardinality": null, "answerCardinality": null, "question": "With data type ST", "answers": null,
      "skipLogic": null, "editable": null, "defaultAnswer": null, "displayControl": null, "calculationMethod": null, "items": null},
    {"questionCode": "q4", "dataType": "DT", "header": false, "units": null, "codingInstructions": null, "value": "Wed Nov 17 2015 00:00:00 GMT-0500 (EST)",
      "questionCardinality": null, "answerCardinality": null, "question": "With data type DT", "answers": null,
      "skipLogic": null, "editable": null, "defaultAnswer": null, "displayControl": null, "calculationMethod": null, "items": null},
    // answer list, default answer
    {"questionCode": "q5", "dataType": "CNE", "header": false, "units": null, "codingInstructions": null,
      "questionCardinality": null, "answerCardinality": null, "question": "With data type CNE, default value", "answers": [
      {"code": "c1", "text": "Answer 1", "other": null},
      {"code": "c2", "text": "Answer 2", "other": null},
      {"code": "c3", "text": "Answer 3", "other": null},
      {"code": "c4", "text": "Other:", "other": true}],
      "skipLogic": null, "editable": null, "defaultAnswer": 'Answer 2', "displayControl": null, "calculationMethod": null, "items": null},
    // answer list, user selected value
    {"questionCode": "q6", "dataType": "CNE", "header": false, "units": null, "codingInstructions": null, "value": {"code": "c1", "text": "Answer 1", "other": null},
      "questionCardinality": null, "answerCardinality": null, "question": "With data type CNE, user value", "answers": [
      {"code": "c1", "text": "Answer 1", "other": null},
      {"code": "c2", "text": "Answer 2", "other": null},
      {"code": "c3", "text": "Answer 3", "other": null},
      {"code": "c4", "text": "Other:", "other": true}],
      "skipLogic": null, "editable": null, "displayControl": null, "calculationMethod": null, "items": null},
    // answer list, user selected value overrides default answer
    {"questionCode": "q7", "dataType": "CNE", "header": false, "units": null, "codingInstructions": null, "value": {"code": "c3", "text": "Answer 3", "other": null},
      "questionCardinality": null, "answerCardinality": null, "question": "With data type CNE, user value over default value", "answers": [
      {"code": "c1", "text": "Answer 1", "other": null},
      {"code": "c2", "text": "Answer 2", "other": null},
      {"code": "c3", "text": "Answer 3", "other": null},
      {"code": "c4", "text": "Other:", "other": true}],
      "skipLogic": null, "editable": null, "defaultAnswer": 'Answer 2', "displayControl": null, "calculationMethod": null, "items": null},

    // multi-select CNE
    {"questionCode": "q8", "dataType": "CNE", "header": false, "units": null, "codingInstructions": null, "value": [{"code": "c1", "text": "Answer 1"},{"code": "c3", "text": "Answer 3"}],
      "questionCardinality": null, "answerCardinality": {"min": "0", "max": "*"}, "question": "Multi Selection on CNE", "answers": [
      {"code": "c1", "text": "Answer 1"},
      {"code": "c2", "text": "Answer 2"},
      {"code": "c3", "text": "Answer 3"},
      {"code": "c4", "text": "Answer 4"}],
      "skipLogic": null, "editable": null, "defaultAnswer": null, "displayControl": null, "calculationMethod": null, "items": null},
    // multi-select CWE, with a mix of selected answers and user typed data
    {"questionCode": "q9", "dataType": "CWE", "header": false, "units": null, "codingInstructions": null,
      "value": [{"code": "c2", "text": "Answer 2"},{"text": "User created answer"}],
      "questionCardinality": null, "answerCardinality": {"min": "0", "max": "*"}, "question": "Multi Selection on CWE", "answers": [
      {"code": "c1", "text": "Answer 1"},
      {"code": "c2", "text": "Answer 2"},
      {"code": "c3", "text": "Answer 3"},
      {"code": "c4", "text": "Answer 4"}],
      "skipLogic": null, "editable": null, "defaultAnswer": null, "displayControl": null, "calculationMethod": null, "items": null},
    // multi-select CWE with a search autocomplter
    {"questionCode": "q10", "dataType": "CWE", "header": false, "units": null, "codingInstructions": null, "value": [{"code": "c2", "text": "Answer 2"},{"text": "User created answer"}],
      "questionCardinality": null, "answerCardinality": {"min": "0", "max": "*"}, "question": "Multi Selection on CWE, a search field",
      "externallyDefined":"https://clin-table-search.lhc.nlm.nih.gov/api/variants/v3/search?df=AlleleID,RefSeqID,GeneSymbol,NucleotideChange,AminoAcidChange&ef=RefSeqID,GeneSymbol,NucleotideChange,AminoAcidChange,phenotypes",
      "skipLogic": null, "editable": null, "defaultAnswer": null, "displayControl": null, "calculationMethod": null, "items": null},

    // skip logic works
    {"questionCode": "slSource1", "dataType": "INT", "header": false, "units": null, "value": 2, "codingInstructions": "1 to show T1; >=2 to show T2; <=5 to show header T3, and its subitmes T4 and T5.",
      "questionCardinality": null, "answerCardinality": null, "question": "Skip Logic Source #1", "answers": null,
      "editable": null, "defaultAnswer": null, "displayControl": null, "calculationMethod": null, "items": null},
      // hidden
    {"questionCode": "slTargetItem1", "dataType": "INT", "header": false, "units": null, "codingInstructions": null,
      "questionCardinality": null, "answerCardinality": null, "question": "T1: Shown when 'Skip Logic Source #1' == 1", "answers": null,
      "skipLogic": {"conditions":[{"source": "slSource1", "trigger": {"value": 1}}],
        "action": "show"},
      "editable": null, "defaultAnswer": null, "displayControl": null, "calculationMethod": null, "items": null},
      // shown, with user value
    {"questionCode": "slTargetItem2", "dataType": "INT", "header": false, "units": null, "codingInstructions": null, "value": 200,
      "questionCardinality": null, "answerCardinality": null, "question": "T2: Shown when 'Skip Logic Source #1' > 1", "answers": null,
      "skipLogic": {"conditions":[{"source": "slSource1", "trigger": {"minInclusive": 2}}],
        "action": "show"},
      "editable": null, "defaultAnswer": null, "displayControl": null, "calculationMethod": null, "items": null},
      // shown
    {"questionCode": "slTargetHeader1", "dataType": "", "header": true, "units": null, "codingInstructions": null,
      "questionCardinality": null, "answerCardinality": null, "question": "T3: Shown when 'Skip Logic Source #1' <= 5", "answers": null,
      "skipLogic": {"conditions":[{"source": "slSource1", "trigger": {"maxInclusive": 5}}],
        "action": "show"},
      "editable": null, "defaultAnswer": null, "displayControl": null, "calculationMethod": null,
      "items": [
          // shown, with user value
        {"questionCode": "slTargetSubItem1", "dataType": "INT", "header": false, "units": null, "codingInstructions": null, "value": 201,
          "questionCardinality": null, "answerCardinality": null, "question": "T4: Shown when my section header is shown", "answers": null,
          "skipLogic": null, "editable": null, "defaultAnswer": null, "displayControl": null, "calculationMethod": null, "items": null},
          // shown, with user value
        {"questionCode": "slTargetSubItem2","dataType": "INT", "header": false, "units": null, "codingInstructions": null, "value": 202,
          "questionCardinality": null, "answerCardinality": null, "question": "T5: Shown when my section header is shown", "answers": null,
          "skipLogic": null, "editable": null, "defaultAnswer": null, "displayControl": null, "calculationMethod": null, "items": null}
      ]
    },

    // multiple instances of repeating items all shown
    {"questionCode": "rp-q1", "questionCardinality": {"min": "1", "max": "*"}, "question": "A Repeating Item", "value": "instance A"},
    {"questionCode": "rp-q1", "questionCardinality": {"min": "1", "max": "*"}, "question": "A Repeating Item", "value": "instance B"},

    {"questionCode": "rp-q2", "header": true, "question": "A Repeating Section","questionCardinality":{"max": "*", "min": "1"},
      "items": [
        {"questionCode": "rp-q3", "dataType": "INT", "header": false, "units": null, "value": 300,
          "questionCardinality": null, "answerCardinality": null, "question": "An item in a repeating section", "answers": null,
          "editable": null, "defaultAnswer": null, "displayControl": null, "calculationMethod": null, "items": null},
        {"questionCode": "rp-q4", "dataType": "", "header": true, "questionCardinality":{"max": "*", "min": "1"},
          "answerCardinality": null, "question": "A repeating section in a repeating section",
          "editable": null, "defaultAnswer": null, "displayControl": null, "calculationMethod": null,
          "items": [
            {"questionCode": "rp-q5", "dataType": "INT", "header": false, "units": null, "codingInstructions": null, "value": 400,
              "questionCardinality": null, "answerCardinality": null, "question": "A sub-sub item", "answers": null,
              "skipLogic": null, "editable": null, "defaultAnswer": null, "displayControl": null, "calculationMethod": null, "items": null}
          ]
        },
        {"questionCode": "rp-q4", "dataType": "", "header": true, "questionCardinality":{"max": "*", "min": "1"},
          "answerCardinality": null, "question": "A repeating section in a repeating section",
          "editable": null, "defaultAnswer": null, "displayControl": null, "calculationMethod": null,
          "items": [
            {"questionCode": "rp-q5", "dataType": "INT", "header": false, "units": null, "codingInstructions": null, "value": 401,
              "questionCardinality": null, "answerCardinality": null, "question": "A sub-sub item", "answers": null,
              "skipLogic": null, "editable": null, "defaultAnswer": null, "displayControl": null, "calculationMethod": null, "items": null}
          ]
        },
        {"questionCode": "rp-q4", "dataType": "", "header": true, "questionCardinality":{"max": "*", "min": "1"},
          "answerCardinality": null, "question": "A repeating section in a repeating section",
          "editable": null, "defaultAnswer": null, "displayControl": null, "calculationMethod": null,
          "items": [
            {"questionCode": "rp-q5", "dataType": "INT", "header": false, "units": null, "codingInstructions": null, "value": 402,
              "questionCardinality": null, "answerCardinality": null, "question": "A sub-sub item", "answers": null,
              "skipLogic": null, "editable": null, "defaultAnswer": null, "displayControl": null, "calculationMethod": null, "items": null}
          ]
        }
      ]
    },
    {"questionCode": "rp-q2", "header": true, "question": "A Repeating Section","questionCardinality":{"max": "*", "min": "1"},
      "items": [
        {"questionCode": "rp-q3", "dataType": "INT", "header": false, "units": null, "value": 301,
          "questionCardinality": null, "answerCardinality": null, "question": "An item in a repeating section", "answers": null,
          "editable": null, "defaultAnswer": null, "displayControl": null, "calculationMethod": null, "items": null},
        {"questionCode": "rp-q4", "dataType": "", "header": true, "questionCardinality":{"max": "*", "min": "1"},
          "answerCardinality": null, "question": "A repeating section in a repeating section",
          "editable": null, "defaultAnswer": null, "displayControl": null, "calculationMethod": null,
          "items": [
            {"questionCode": "rp-q5", "dataType": "INT", "header": false, "units": null, "codingInstructions": null, "value": 403,
              "questionCardinality": null, "answerCardinality": null, "question": "A sub-sub item", "answers": null,
              "skipLogic": null, "editable": null, "defaultAnswer": null, "displayControl": null, "calculationMethod": null, "items": null}
          ]
        }
      ]
    },
    // a new dataType for a special header that has no children but divides questions into upper and lower sections
    {
      "questionCode": "titleHeader",
      "question": "This is a TITLE. It looks like a section header but has no children",
      "dataType": "TITLE",
      "header": true
    },


    // skip logic, within a repeating section, works
      // user value shown
    {"questionCode": "rpSource2", "dataType": "INT", "header": false, "units": null, "codingInstructions": "2 to show T2", "value": 2,
      "questionCardinality": null, "answerCardinality": null, "question": "Skip Logic Source (repeating) #2", "answers": null,
      "editable": null, "defaultAnswer": null, "displayControl": null, "calculationMethod": null, "items": null},
    {"questionCode": "repeatingSection1", "header": true, "question": "A Repeating Section","questionCardinality":{"max": "*", "min": "1"},
      "items": [
          // user value shown
        {"questionCode": "rpSource1", "dataType": "INT", "header": false, "units": null, "value": 3, "codingInstructions": "1 to show T1; <=5 to show header T3, and its subitem T4.",
          "questionCardinality": null, "answerCardinality": null, "question": "Skip Logic Source (repeating) #1", "answers": null,
          "editable": null, "defaultAnswer": null, "displayControl": null, "calculationMethod": null, "items": null},
          // hidden
        {"questionCode": "rpTargetItem1", "dataType": "INT", "header": false, "units": null, "codingInstructions": null,
          "questionCardinality": null, "answerCardinality": null, "question": "T1: Shown when 'Skip Logic Source (repeating) #1' == 1", "answers": null,
          "skipLogic": {"conditions":[{"source": "rpSource1", "trigger": {"value": 1}}],
            "action": "show"},
          "editable": null, "defaultAnswer": null, "displayControl": null, "calculationMethod": null, "items": null},
          // shown
        {"questionCode": "rpTargetItem2", "dataType": "INT", "header": false, "units": null, "codingInstructions": null,
          "questionCardinality": null, "answerCardinality": null, "question": "T2: Shown when 'Skip Logic Source (repeating) #2' == 2", "answers": null,
          "skipLogic": {"conditions":[{"source": "rpSource2", "trigger": {"value": 2}}],
            "action": "show"},
          "editable": null, "defaultAnswer": null, "displayControl": null, "calculationMethod": null, "items": null},
          // shown
        {"questionCode": "rpTargetHeader1", "dataType": "", "header": true, "units": null, "codingInstructions": null,
          "questionCardinality": null, "answerCardinality": null, "question": "T3: Shown when 'Skip Logic Source (repeating) #1' <= 5", "answers": null,
          "skipLogic": {"conditions":[{"source": "rpSource1", "trigger": {"maxInclusive": 5}}],
            "action": "show"},
          "editable": null, "defaultAnswer": null, "displayControl": null, "calculationMethod": null,
          "items": [
              // shown
            {"questionCode": "rpTargetSubItem1", "dataType": "INT", "header": false, "units": null, "codingInstructions": null,
              "questionCardinality": null, "answerCardinality": null, "question": "T4: Shown when my section header is shown", "answers": null,
              "skipLogic": null, "editable": null, "defaultAnswer": null, "displayControl": null, "calculationMethod": null, "items": null}
          ]
        }
      ]
    }

  ]};


var rxTerms = {
  type: "LOINC",
  code: "X-001",
  name: "RxTerms Demo",
  template: "form-view-b",
  templateOptions: {
    hideFormControls: true,
    showFormHeader: false,
    showColumnHeaders: false
  },
  items: [
          {
            "questionCode": "X-002", "question": "Prescription entry", "header":true,
            "layout":"horizontal", "questionCardinality": {"min": "1", "max": "*"},
            "items": [
              {
                "questionCode": "nameAndRoute",
                "dataType":"CNE",
                "header":false,
                "question":"Drug Name",
                "externallyDefined":
                  "https://clin-table-search.lhc.nlm.nih.gov/api/rxterms/v3/search?ef=STRENGTHS_AND_FORMS,RXCUIS",
              },
              {
                "questionCode": "strengthAndForm",
                "dataType": "CNE",
                "header": false,
                "question": "Strength",
                "dataControl": [
                  {
                    "source": {
                      "sourceType": "INTERNAL",
                      "sourceItemCode": "nameAndRoute"
                    },
                    "construction": "ARRAY",
                    "dataFormat": {"code": "value.data.RXCUIS",
                      "text": "value.data.STRENGTHS_AND_FORMS"},
                    "onAttribute": "answers"
                  }
                ]
              },
              {
                "questionCode": "RxCUI",
                "dataType": "",
                "question": "RxCUI",
                "dataControl": [
                  {
                    "source": {
                      "sourceType": "INTERNAL",
                      "sourceItemCode": "strengthAndForm"
                    },
                    "construction": "SIMPLE",
                    "dataFormat": "value.code",
                    "onAttribute": "value"
                  }
                ]
              }
            ]
          }
  ]
};


var genetic = {
  "type": "LOINC",
  "code": "X1000-0",
  "name": "HL7 Genetic Test Panel for Simple Variants - 20160308",
  "template": "form-view-a",
  "dataType": null,
  "header": null,
  "units": null,
  "codingInstructions": "NIH/NLM/LHNCBC",
  "copyrightNotice": null,
  "items": [
    {"questionCode": "XXXXX-12",
      "question": "Choose kind of mutations targeted",
      "dataType": "CNE",
      "answerCardinality": {"max": "*", "min":"0"},
      "answers": [
        {"code": "C01", "text": "Simple variations"},
        {"code": "C02", "text": "Structural (copy number) variations"}
      ]
    },
    {"questionCode": "XXXXX-2",
      "question": "Choose mutation identifiers",
      "dataType": "CNE",
      "codingInstructions": "Not part of the HL7 specification. Used only to show different choices of codes for representing variants",
      "answerCardinality": {"max": "*", "min":"0"},
      "skipLogic": {"conditions":[{"source": "XXXXX-12", "trigger": {"code": "C01"}}],
        "action": "show"},
      "answers": [
        {"code": "C01", "text": "dbSNP  --NCBI"},
        {"code": "C04", "text": "CIGAR"},
        {"code": "C05", "text": "COSMIC"}
      ]
    },
    {"questionCode": "XXXXX-10",
      "question": "Choose region of interest specification",
      "dataType": "CNE",
      "codingInstructions":"Not part of the HL7 specification. Used only to choose whether this is a targeted nutation analysis or a full sequencing analysis",
      "answerCardinality": {"max": "*", "min":"0"},
      "answers": [
        {"code": "C01", "text": "Specific targeted mutations"},
        {"code": "C02", "text": "Sequence range of RefSeq"}
      ]
    },

    {"questionCode": "53577-3",
      "question": "Reason for study"
    },
    {
      "questionCode":"51967-8",
      "localQuestionCode":null,
      "dataType":"CWE",
      "header":false,
      "units":null,
      "codingInstructions":"Choose diseases coded within MedGen or type in your own text name.",
      "copyrightNotice":null,
      "questionCardinality":null,
      "answerCardinality":{
        "min":"0",
        "max":"*"
      },
      "question":"Genetic disease assessed",
      "externallyDefined":"https://clin-table-search.lhc.nlm.nih.gov/api/disease_names/v3/search",
      "answers":null,
      "skipLogic":null,
      "restrictions":null,
      "editable":null,
      "defaultAnswer":null,
      "displayControl":null,
      "calculationMethod":null,
      "items":null
    },

    {"questionCode": "48002-0",
      "question": "Genomic source class",
      "dataType": "CNE",
      "answerCardinality": {"max": "1", "min":"0"},
      "answers": [
        {"code": "LA6683-2", "text": "Germline"},
        {"code": "LA6684-0", "text": "Somatic"},
        {"code": "LA10429-1", "text": "Prenatal"},
        {"code": "LA18194-3", "text": "Likely germline"},
        {"code": "LA18195-0", "text": "Likely somatic"},
        {"code": "LA18196-8", "text": "Likely prenatal"},
        {"code": "LA18197-6", "text": "Unknown genomic origin"}
      ]
    },
    {"questionCode": "48018-6",
      "question": "Gene(s) examined",
      "dataType": "CNE",
      "answerCardinality": {"max": "*", "min":"0"},
      "externallyDefined":"https://clin-table-search.lhc.nlm.nih.gov/api/genes/v3/search?df=symbol"
    },
    {"questionCode": "XXXXX-0",
      "question": "Full narrative report",
      "dataType": "TX"
    },
    {"questionCode": "51968-6",
      "question": "Genetic analysis overall interpretation",
      "dataType": "CNE",
      "answers": [
        {"code": "LA6576-8", "text": "Positive"},
        {"code": "LA6577-6", "text": "Negative"},
        {"code": "LA9663-1", "text": "Inconclusive"},
        {"code": "LA9664-9", "text": "Failure"}
      ]
    },
    {"questionCode": "XXXXX-9",
      "question": "Simple variation",
      "questionCardinality": {"max": "*", "min":"0"},
      "skipLogic": {"conditions":[{"source": "XXXXX-12", "trigger": {"code": "C01"}}],
        "action": "show"},
      "header": true,
      "items" : [
        {"questionCode": "XXXXX-5",
          "question": "Variant ID",
          "dataType": "CNE",
          "answerCardinality": {"max": "1", "min":"0"},
          "displayControl": {
            "listColHeaders": ["Variant&nbsp;ID <a>", "RefSeq ID", "Gene",
              "Nucleotide Change", "Amino Acid Change"]
          },
          "externallyDefined":"https://clin-table-search.lhc.nlm.nih.gov/api/variants/v3/search?df=VariantID,RefSeqID,GeneSymbol,NucleotideChange,AminoAcidChange&ef=RefSeqID,GeneSymbol,NucleotideChange,AminoAcidChange,phenotype,AlternateAllele,ReferenceAllele,Cytogenetic,dbSNP,VariantID"
        },
        {"questionCode": "48018-6",
          "question": "Gene symbol",
          "dataType": "CNE",
          "answerCardinality": {"max": "1", "min":"0"},
          "externallyDefined":"https://clin-table-search.lhc.nlm.nih.gov/api/genes/v3/search?df=symbol,name_mod",
          "dataControl": [
            {
              "source": {
                "sourceType":"INTERNAL",
                "sourceItemCode":"XXXXX-5"
              },
              "construction":"OBJECT",
              "dataFormat":{"code": "value.code", "text": "value.data.GeneSymbol"},
              "onAttribute":"value"
            }
          ]
        },
        {"questionCode": "48013-7",
          "question": "Reference sequence ID",
          "dataType":"CNE",
          "externallyDefined":"https://clin-table-search.lhc.nlm.nih.gov/api/genes/v3/search?df=refseq_accession,name_mod&sf=symbol,refseq_accession",
          "dataControl": [
            {
              "source": {
                "sourceType":"INTERNAL",
                "sourceItemCode":"XXXXX-5"
              },
              "construction":"OBJECT",
              "dataFormat":{"code": "value.code", "text": "value.data.RefSeqID"},
              "onAttribute":"value"
            }
          ]
        },
        {"questionCode": "41103-3",
          "question": "DNA change - HGVS(c.)",
          "dataType": "ST",
          "dataControl": [
            {
              "source": {
                "sourceType":"INTERNAL",
                "sourceItemCode":"XXXXX-5"
              },
              "construction":"SIMPLE",
              "dataFormat": "value.data.NucleotideChange",
              "onAttribute":"value"
            }
          ]
        },
        {"questionCode": "48005-3",
          "question": "Amino acid change - HGVS(p.)",
          "dataType": "ST",
          "dataControl": [
            {
              "source": {
                "sourceType":"INTERNAL",
                "sourceItemCode":"XXXXX-5"
              },
              "construction":"SIMPLE",
              "dataFormat": "value.data.AminoAcidChange",
              "onAttribute":"value"
            }
          ]
        },
        {"questionCode": "69547-8",
          "question": "Reference allele",
          "dataControl": [
            {
              "source": {
                "sourceType":"INTERNAL",
                "sourceItemCode":"XXXXX-5"
              },
              "construction":"SIMPLE",
              "dataFormat": "value.data.ReferenceAllele",
              "onAttribute":"value"
            }
          ]
        },
        {"questionCode": "X0029",
          "question": "Allele location"
        },
        {"questionCode": "69551-0",
          "question": "Alternate allele",
          "dataControl": [
            {
              "source": {
                "sourceType":"INTERNAL",
                "sourceItemCode":"XXXXX-5"
              },
              "construction":"SIMPLE",
              "dataFormat": "value.data.AlternateAllele",
              "onAttribute":"value"
            }
          ]
        },
        {
          "questionCode":"53034-5",
          "localQuestionCode":null,
          "dataType":"CNE",
          "header":false,
          "units":null,
          "codingInstructions":"The level of occurrence of a single DNA Marker within a set of chromosomes. Heterozygous indicates the DNA Marker is only present in one of the two genes contained in homologous chromosomes. Homozygous indicates the DNA Marker is present in both genes contained in homologous chromosomes. Hemizygous indicates the DNA Marker exists in the only single copy of a gene in a non-homologous chromosome (The male X and Y chromosome are non-homologous). Hemiplasmic indicates that the DNA Marker is present in some but not all of the copies of mitochondrial DNA. Homoplasmic indicates that the DNA Maker is present in all of the copies of mitochondrial DNA.\r\n",
          "copyrightNotice":null,
          "questionCardinality":null,
          "answerCardinality":{
            "min":"0",
            "max":"1"
          },
          "question":"Allelic state",
          "answers":[
            {
              "label":null,
              "code":"LA6703-8",
              "text":"Heteroplasmic",
              "score":null,
              "other":null
            },
            {
              "label":null,
              "code":"LA6704-6",
              "text":"Homoplasmic",
              "score":null,
              "other":null
            },
            {
              "label":null,
              "code":"LA6705-3",
              "text":"Homozygous",
              "score":null,
              "other":null
            },
            {
              "label":null,
              "code":"LA6706-1",
              "text":"Heterozygous",
              "score":null,
              "other":null
            },
            {
              "label":null,
              "code":"LA6707-9",
              "text":"Hemizygous",
              "score":null,
              "other":null
            }
          ],
          "skipLogic":null,
          "restrictions":null,
          "editable":null,
          "defaultAnswer":null,
          "displayControl":null,
          "calculationMethod":null,
          "items":null
        },
        {"questionCode": "X1001-0",
          "question": "Cytogenetic location",
          "dataType": "CWE",
          "answerCardinality": {"max": "1", "min":"0"},
          "externallyDefined": "https://clin-table-search.lhc.nlm.nih.gov/api/variants/v3/search?df=Cytogenetic",
          "dataControl": [
            {
              "source": {
                "sourceType":"INTERNAL",
                "sourceItemCode":"XXXXX-5"
              },
              "construction":"OBJECT",
              "dataFormat":{"code": "value.code", "text": "value.data.Cytogenetic"},
              "onAttribute":"value"
            }
          ]
        },
        {"questionCode": "53037-8",
          "question": "Clinical significance",
          "dataType": "CWE",
          "answerCardinality": {"max": "1", "min":"0"},
          "answers": [{
            "code": "LA6668-3",
            "text": "Pathogenic"
          }, {
            "code": "LA6669-1",
            "text": "Presumed Pathogenic"
          }, {
            "code": "LA6670-9",
            "text": "Novel Presumed Pathogenic"
          }, {
            "code": "LA6671-7",
            "text": "Novel Unknown Significance"
          }, {
            "code": "LA6672-5",
            "text": "Novel Presumed Benign"
          }, {
            "code": "LA6673-3",
            "text": "Novel"
          }, {
            "code": "LA6674-1",
            "text": "Presumed Benign"
          }, {
            "code": "LA6675-8",
            "text": "Benign"
          }, {
            "code": "LA6676-6",
            "text": "Resistant"
          }, {
            "code": "LA6677-4",
            "text": "Responsive"
          }, {
            "code": "LA6678-2",
            "text": "Novel Presumed Non-Responsive"
          }, {
            "code": "LA6679-0",
            "text": "Novel Presumed Responsive"
          }, {
            "code": "LA6680-8",
            "text": "Unclassified"
          }, {
            "code": "LA6681-6",
            "text": "Polymorphism"
          }, {
            "code": "LA6682-4",
            "text": "Unknown Significance"
          }]
        },
        {"questionCode": "X1002-0",
          "question": "Possible associated phenotype",
          "dataType": "CWE",
          "answerCardinality": {"max": "1", "min":"0"},
          "externallyDefined":"https://clin-table-search.lhc.nlm.nih.gov/api/disease_names/v3/search",
          "dataControl": [
            {
              "source": {
                "sourceType":"INTERNAL",
                "sourceItemCode":"XXXXX-5"
              },
              "construction":"SIMPLE",
              "dataFormat":"value.data.phenotype",
              "onAttribute":"value"
            }
          ]
        },
        {"questionCode": "XXXXX-4",
          "question": "dbSNP ID for mutations",
          "dataType": "CNE",
          "answerCardinality": {"max": "1", "min":"0"},
          "externallyDefined":"https://clin-table-search.lhc.nlm.nih.gov/api/snps/v3/search",
          "skipLogic": {"conditions":[{"source": "XXXXX-2", "trigger": {"code": "C01"}}],
            "action": "show"},
          "dataControl": [
            {
              "source": {
                "sourceType":"INTERNAL",
                "sourceItemCode":"XXXXX-5"
              },
              "construction":"OBJECT",
              "dataFormat": {"text": "value.data.dbSNP", "code": "value.code"},
              "onAttribute":"value"
            }
          ]
        },
        {"questionCode": "XXXXX-6",
          "question": "CIGAR specification for mutations",
          "skipLogic": {"conditions":[{"source": "XXXXX-2", "trigger": {"code": "C04"}}],
            "action": "show"}
        },
        {"questionCode": "XXXXX-7",
          "question": "COSMIC ID for mutations",
          "skipLogic": {"conditions":[{"source": "XXXXX-2", "trigger": {"code": "C05"}}],
            "action": "show"}
        }
      ]
    },


    {"questionCode": "XXXX2-9",
      "question": "Structural (copy number) variation",
      "questionCardinality": {"max": "*", "min":"0"},
      "skipLogic": {"conditions":[{"source": "XXXXX-12", "trigger": {"code": "C02"}}],
        "action": "show"},
      "header": true,
      "items" : [
        {"questionCode": "48018-6",
          "question": "Gene symbol",
          "dataType": "CNE",
          "answerCardinality": {"max": "1", "min":"0"},
          "externallyDefined":"https://clin-table-search.lhc.nlm.nih.gov/api/genes/v3/search?df=symbol,name_mod&ef=refseq_accession,location"
        },
        {"questionCode": "48013-7",
          "question": "Reference sequence ID",
          "dataType":"CWE",
          "externallyDefined":"https://clin-table-search.lhc.nlm.nih.gov/api/genes/v3/search?df=refseq_accession,name_mod&sf=symbol,refseq_accession",
          "dataControl": [
            {
              "source": {
                "sourceType":"INTERNAL",
                "sourceItemCode":"48018-6"
              },
              "construction":"OBJECT",
              "dataFormat": {"text": "value.data.refseq_accession", "code": "value.code"},
              "onAttribute":"value"
            }
          ]
        },
        {"questionCode": "X12313",
          "question": "Structural variant reported start-end",
          "dataType": "ST",
          "answerCardinality": {"max": "1", "min":"1"}
        },
        {"questionCode": "X12320",
          "question": "Precision of boundaries",
          "dataType": "CWE",
          "answerCardinality": {"max": "1", "min":"0"},
          "answers": [
            {"code": "1","text": "Exact"},
            {"code": "2","text": "Within 10^3 kb"},
            {"code": "3","text": "Within 10^4 kb"},
            {"code": "4","text": "Within 10^5 kb"},
            {"code": "5","text": "Within 10^6 kb"},
            {"code": "6","text": "Within 10^7 kb"}
          ]
        },
        {"questionCode": "X12314",
          "question": "Structural variant reported aCGH ratio",
          "dataType": "ST",
          "answerCardinality": {"max": "1", "min":"0"}
        },
        {"questionCode": "48019-4",
          "question": "DNA sequence variation type",
          "dataType": "CWE",
          "answerCardinality": {"max": "1", "min":"0"},
          "answers": [
            {"text":"Wild type"    	    ,"code":"LA9658-1"},
            {"text":"Deletion"    	    	,"code":"LA6692-3"},
            {"text":"Duplication"    	  ,"code":"LA6686-5"},
            {"text":"Insertion"    	 	  ,"code":"LA6687-3"},
            {"text":"Insertion/Deletion" ,"code":"LA6688-1"},
            {"text":"Inversion"    	 	  ,"code":"LA6689-9"},
            {"text":"Substitution"    	 	,"code":"LA6690-7"}
          ]
        },
        {"questionCode": "X12315",
          "question": "Structural variant length",
          "dataType": "INT",
          "answerCardinality": {"max": "1", "min":"0"}
        },
        {"questionCode": "X12316",
          "question": "Structural variant outer start-end",
          "dataType": "ST",
          "answerCardinality": {"max": "1", "min":"0"}
        },
        {"questionCode": "X12317",
          "question": "Structural variant inner start-end",
          "dataType": "ST",
          "answerCardinality": {"max": "1", "min":"0"}
        },
        {"questionCode": "X12318",
          "question": "Structural variant HGVS",
          "dataType": "ST",
          "answerCardinality": {"max": "1", "min":"0"}
        },
        {"questionCode": "X12319",
          "question": "Structural variant ISCN",
          "dataType": "ST",
          "answerCardinality": {"max": "1", "min":"0"}
        }
      ]
    },


    {"questionCode": "36908-2",
      "question": "Gene mutations tested for",
      "dataType": "CWE",
      "answerCardinality": {"max": "*", "min":"0"},
      "skipLogic": {"conditions":[{"source": "XXXXX-10", "trigger": {"code": "C01"}}],
        "action": "show"},
      "externallyDefined":"https://lhcs-lynch-rh:4433/alleles?df=AlleleID,GeneSymbol,NucleotideChange,AminoAcidChange"
    },
    {"questionCode": "XXXXX-11",
      "question": "Range(s) of DNA sequence examined",
      "skipLogic": {"conditions":[{"source": "XXXXX-10", "trigger": {"code": "C02"}}],
        "action": "show"}
    }
  ]
};


var genetic2 ={
  "type": "LOINC",
  "code": "X2000-0",
  "name": "HL7 Genetic Test Panel for Variants - 20160321 (table version)",
  "template": "form-view-b",
  "dataType": null,
  "header": null,
  "units": null,
  "codingInstructions": "NIH/NLM/LHNCBC",
  "copyrightNotice": null,
  "items": [
    {"questionCode": "XXXXX-12",
      "question": "Choose kind of mutations targeted",
      "dataType": "CNE",
      "answerCardinality": {"max": "*", "min":"0"},
      "answers": [
        {"code": "C01", "text": "Simple variants"},
        {"code": "C02", "text": "Complex variants"},
        {"code": "C03", "text": "Structural (copy number) variants"}
      ]
    },
    {"questionCode": "XXXXX-2",
      "question": "Choose other mutation identifiers",
      "dataType": "CNE",
      "codingInstructions": "Not part of the HL7 specification. Used only to show different choices of codes for representing variants",
      "answerCardinality": {"max": "*", "min":"0"},
      "skipLogic": {"conditions":[{"source": "XXXXX-12", "trigger": {"code": "C01"}}],
        "action": "show"},
      "answers": [
        {"code": "C01", "text": "dbSNP  --NCBI"},
        {"code": "C04", "text": "CIGAR"},
        {"code": "C05", "text": "COSMIC"}
      ]
    },
    {"questionCode": "XXXXX-10",
      "question": "Choose region of interest specification",
      "dataType": "CNE",
      "codingInstructions":"Not part of the HL7 specification. Used only to choose whether this is a targeted nutation analysis or a full sequencing analysis",
      "answerCardinality": {"max": "*", "min":"0"},
      "answers": [
        {"code": "C01", "text": "Specific targeted mutations"},
        {"code": "C02", "text": "Sequence range(s) in the reference seq"}
      ]
    },

    {"questionCode": "53577-3",
      "question": "Reason for study"
    },
    {
      "questionCode":"51967-8",
      "localQuestionCode":null,
      "dataType":"CWE",
      "header":false,
      "units":null,
      "codingInstructions":"Choose diseases coded within MedGen or type in your own text name.",
      "copyrightNotice":null,
      "questionCardinality":null,
      "answerCardinality":{
        "min":"0",
        "max":"*"
      },
      "question":"Genetic disease assessed",
      "externallyDefined":"https://clin-table-search.lhc.nlm.nih.gov/api/disease_names/v3/search",
      "answers":null,
      "skipLogic":null,
      "restrictions":null,
      "editable":null,
      "defaultAnswer":null,
      "displayControl":null,
      "calculationMethod":null,
      "items":null
    },

    {"questionCode": "48002-0",
      "question": "Genomic source class",
      "dataType": "CNE",
      "answerCardinality": {"max": "1", "min":"0"},
      "answers": [
        {"code": "LA6683-2", "text": "Germline"},
        {"code": "LA6684-0", "text": "Somatic"},
        {"code": "LA10429-1", "text": "Prenatal"},
        {"code": "LA18194-3", "text": "Likely germline"},
        {"code": "LA18195-0", "text": "Likely somatic"},
        {"code": "LA18196-8", "text": "Likely prenatal"},
        {"code": "LA18197-6", "text": "Unknown genomic origin"}
      ]
    },
    {"questionCode": "48018-6",
      "question": "Gene(s) examined",
      "dataType": "CNE",
      "answerCardinality": {"max": "*", "min":"0"},
      "externallyDefined":"https://clin-table-search.lhc.nlm.nih.gov/api/genes/v3/search?df=symbol,name_mod"
    },
    {"questionCode": "36908-2",
      "question": "Gene mutations tested for",
      "dataType": "CWE",
      "answerCardinality": {"max": "*", "min":"0"},
      "skipLogic": {"conditions":[{"source": "XXXXX-10", "trigger": {"code": "C01"}}],
        "action": "show"},
      "externallyDefined":"https://lhcs-lynch-rh:4433/alleles?df=AlleleID,GeneSymbol,NucleotideChange,AminoAcidChange"
    },
    {"questionCode": "XXXXX-11",
      "question": "Range(s) of DNA sequence examined",
      "skipLogic": {"conditions":[{"source": "XXXXX-10", "trigger": {"code": "C02"}}],
        "action": "show"}
    },
    {"questionCode": "XXXXX-0",
      "question": "Full narrative report",
      "dataType": "TX"
    },
    {"questionCode": "51968-6",
      "question": "Genetic analysis overall interpretation",
      "dataType": "CNE",
      "answers": [
        {"code": "LA6576-8", "text": "Positive"},
        {"code": "LA6577-6", "text": "Negative"},
        {"code": "LA9663-1", "text": "Inconclusive"},
        {"code": "LA9664-9", "text": "Failure"}
      ]
    },
    {
      "questionCode": "titleHeader1",
      "question": "Simple Small Variants Section",
      "dataType": "TITLE",
      "skipLogic": {"conditions":[{"source": "XXXXX-12", "trigger": {"code": "C01"}}],
        "action": "show"},
      "header": true
    },

    {"questionCode": "XXXXX-9",
      "question": "Simple variants",
      "questionCardinality": {"max": "*", "min":"0"},
      "skipLogic": {"conditions":[{"source": "XXXXX-12", "trigger": {"code": "C01"}}],
        "action": "show"},
      "header": true,
      "items" : [
        {"questionCode": "XXXXX-5",
          "question": "Variant ID",
          "dataType": "CNE",
          "answerCardinality": {"max": "1", "min":"0"},
          "externallyDefined":"https://clin-table-search.lhc.nlm.nih.gov/api/variants/v3/search?df=VariantID,RefSeqID,GeneSymbol,NucleotideChange,AminoAcidChange&ef=AlleleID,RefSeqID,GeneSymbol,NucleotideChange,AminoAcidChange,phenotype,AlternateAllele,ReferenceAllele,Cytogenetic,dbSNP,Name"
        },
        {"questionCode": "XXXXX-13",
          "question": "Variant name",
          "dataType": "ST",
          "dataControl": [
            {
              "source": {
                "sourceType":"INTERNAL",
                "sourceItemCode":"XXXXX-5"
              },
                "construction":"SIMPLE",
                "dataFormat": "value.data.Name",
                "onAttribute":"value"
            }
          ]
        },
        {
          "questionCode": "XXXX1-1",
          "question": "Allele(s)",
          "questionCardinality": {
            "max": "1",
            "min": "1"
          },
          "header": true,
          "layout": "horizontal",
          "items": [
            {
              "questionCode": "XXXXX-19",
              "question": "Type",
              "dataType": "CNE",
              "answerCardinality": {
                "max": "1",
                "min": "0"
              },
              "answers": [
                {"code": "C01", "text": "del"},
                {"code": "C02", "text": "dup"},
                {"code": "C03", "text": "fusion"},
                {"code": "C04", "text": "indel"},
                {"code": "C05", "text": "inser"},
                {"code": "C06", "text": "inver"},
                {"code": "C07", "text": "NT exp"},
                {"code": "C08", "text": "protein only"},
                {"code": "C09", "text": "shrt rpt"},
                {"code": "C10", "text": "SNP"},
                {"code": "C11", "text": "structural"},
                {"code": "C12", "text": "undet"}
              ],
              "displayControl": {
                "colCSS": [
                  {
                    "name": "width",
                    "value": "5em"
                  },
                  {
                    "name": "min-width",
                    "value": "2em"
                  }
                ]
              }
            },
            {"questionCode": "48018-6",
              "question": "Gene",
              "dataType": "CNE",
              "answerCardinality": {"max": "1", "min":"0"},
              "externallyDefined":"https://clin-table-search.lhc.nlm.nih.gov/api/genes/v3/search?df=symbol,name_mod",
              "dataControl": [
                {
                  "source": {
                    "sourceType":"INTERNAL",
                    "sourceItemCode":"XXXXX-5"
                  },
                  "construction":"OBJECT",
                  "dataFormat": {"code": "value.code", "text": "value.data.GeneSymbol"},
                  "onAttribute":"value"
                }
              ],
              "displayControl": {
                "colCSS": [{"name": "width", "value":"6em"},
                  {"name": "min-width", "value":"2em"}]
              }
            },
            {"questionCode": "48013-7",
              "question": "NM_RefSeq",
              "dataType": "CNE",
              "displayControl": {
                "colCSS": [{"name": "width", "value":"9em"},
                  {"name": "min-width", "value":"2em"}]
              },
              "externallyDefined":"https://clin-table-search.lhc.nlm.nih.gov/api/variants/v3/search?df=RefSeqID,GeneSymbol",
              "dataControl": [
                {
                  "source": {
                    "sourceType":"INTERNAL",
                    "sourceItemCode":"XXXXX-5"
                  },
                  "construction":"OBJECT",
                  "dataFormat": {"code": "value.code", "text": "value.data.RefSeqID"},
                  "onAttribute":"value"
                }
              ]
            },
            {"questionCode": "41103-3",
              "question": "DNA change",
              "dataType": "CNE",
              "displayControl": {
                "colCSS": [{"name": "width", "value":"50%"},
                  {"name": "min-width", "value":"2em"}]
              },
              "externallyDefined":"https://clin-table-search.lhc.nlm.nih.gov/api/variants/v3/search?df=NucleotideChange,GeneSymbol",
              "dataControl": [
                {
                  "source": {
                    "sourceType":"INTERNAL",
                    "sourceItemCode":"XXXXX-5"
                  },
                  "construction":"OBJECT",
                  "dataFormat": {"code": "value.code", "text": "value.data.NucleotideChange"},
                  "onAttribute":"value"
                }
              ]
            },
            {"questionCode": "48005-3",
              "question": "AA change",
              "dataType": "CNE",
              "displayControl": {
                "colCSS": [{"name": "width", "value":"50%"},
                  {"name": "min-width", "value":"2em"}]
              },
              "externallyDefined":"https://clin-table-search.lhc.nlm.nih.gov/api/variants/v3/search?df=AminoAcidChange,GeneSymbol",
              "dataControl": [
                {
                  "source": {
                    "sourceType":"INTERNAL",
                    "sourceItemCode":"XXXXX-5"
                  },
                  "construction":"OBJECT",
                  "dataFormat": {"code": "value.code", "text": "value.data.AminoAcidChange"},
                  "onAttribute":"value"
                }
              ]
            },
            {"questionCode": "XXXXX-17",
              "question": "NC/NG_RefSeq",
              "displayControl": {
                "colCSS": [{"name": "width", "value":"9em"},
                  {"name": "min-width", "value":"2em"}]
              }
            },
            {"questionCode": "69547-8",
              "question": "Ref allele",
              "displayControl": {
                "colCSS": [{"name": "width", "value":"5em"},
                  {"name": "min-width", "value":"2em"}]
              }
            },
            {"questionCode": "X0029",
              "question": "Genomic loc",
              "displayControl": {
                "colCSS": [{"name": "width", "value":"5em"},
                  {"name": "min-width", "value":"2em"}]
              }

            },
            {"questionCode": "69551-0",
              "question": "Alt allele",
              "displayControl": {
                "colCSS": [{"name": "width", "value":"5em"},
                  {"name": "min-width", "value":"2em"}]
              }
            }
          ]
        },
        {"questionCode": "XXXXX-4",
          "question": "dbSNP ID for mutations",
          "dataType": "CNE",
          "answerCardinality": {"max": "1", "min":"0"},
          "externallyDefined":"https://clin-table-search.lhc.nlm.nih.gov/api/snps/v3/search",
          "skipLogic": {"conditions":[{"source": "XXXXX-2", "trigger": {"code": "C01"}}],
            "action": "show"},
          "dataControl": [
            {
              "source": {
                "sourceType":"INTERNAL",
                "sourceItemCode":"XXXXX-5"
              },
              "construction":"OBJECT",
              "dataFormat": {"code": "value.code", "text": "value.data.dbSNP"},
              "onAttribute":"value"
            }
          ]
        },
        {"questionCode": "XXXXX-7",
          "question": "COSMIC ID for mutations",
          "skipLogic": {"conditions":[{"source": "XXXXX-2", "trigger": {"code": "C05"}}],
            "action": "show"}
        },
        {"questionCode": "XXXXX-6",
          "question": "CIGAR specification for mutations",
          "skipLogic": {"conditions":[{"source": "XXXXX-2", "trigger": {"code": "C04"}}],
            "action": "show"}
        },
        {"questionCode": "XXXX2-13",
          "question": "Allelic Frequency NFR"
        },
        {"questionCode": "X1001-0",
          "question": "Cytogenetic location",
          "dataType": "CWE",
          "answerCardinality": {"max": "1", "min":"0"},
          "externallyDefined": "https://clin-table-search.lhc.nlm.nih.gov/api/variants/v3/search?df=Cytogenetic",
          "dataControl": [
            {
              "source": {
                "sourceType":"INTERNAL",
                "sourceItemCode":"XXXXX-5"
              },
              "construction":"OBJECT",
              "dataFormat": {"code": "value.code", "text": "value.data.Cytogenetic"},
              "onAttribute":"value"
            }
          ]
        },
        {
          "questionCode":"53034-5",
          "localQuestionCode":null,
          "dataType":"CNE",
          "header":false,
          "units":null,
          "codingInstructions":"The level of occurrence of a single DNA Marker within a set of chromosomes. Heterozygous indicates the DNA Marker is only present in one of the two genes contained in homologous chromosomes. Homozygous indicates the DNA Marker is present in both genes contained in homologous chromosomes. Hemizygous indicates the DNA Marker exists in the only single copy of a gene in a non-homologous chromosome (The male X and Y chromosome are non-homologous). Hemiplasmic indicates that the DNA Marker is present in some but not all of the copies of mitochondrial DNA. Homoplasmic indicates that the DNA Maker is present in all of the copies of mitochondrial DNA.\r\n",
          "copyrightNotice":null,
          "questionCardinality":null,
          "answerCardinality":{
            "min":"0",
            "max":"1"
          },
          "question":"Allelic state",
          "answers":[
            {
              "label":null,
              "code":"LA6703-8",
              "text":"Heteroplasmic",
              "score":null,
              "other":null
            },
            {
              "label":null,
              "code":"LA6704-6",
              "text":"Homoplasmic",
              "score":null,
              "other":null
            },
            {
              "label":null,
              "code":"LA6705-3",
              "text":"Homozygous",
              "score":null,
              "other":null
            },
            {
              "label":null,
              "code":"LA6706-1",
              "text":"Heterozygous",
              "score":null,
              "other":null
            },
            {
              "label":null,
              "code":"LA6707-9",
              "text":"Hemizygous",
              "score":null,
              "other":null
            }
          ],
          "skipLogic":null,
          "restrictions":null,
          "editable":null,
          "defaultAnswer":null,
          "displayControl":null,
          "calculationMethod":null,
          "items":null
        },
        {"questionCode": "53037-8",
          "question": "Clinical significance",
          "dataType": "CWE",
          "answerCardinality": {"max": "1", "min":"0"},
          "answers": [{
            "code": "LA6668-3",
            "text": "Pathogenic"
          }, {
            "code": "LA6669-1",
            "text": "Presumed Pathogenic"
          }, {
            "code": "LA6670-9",
            "text": "Novel Presumed Pathogenic"
          }, {
            "code": "LA6671-7",
            "text": "Novel Unknown Significance"
          }, {
            "code": "LA6672-5",
            "text": "Novel Presumed Benign"
          }, {
            "code": "LA6673-3",
            "text": "Novel"
          }, {
            "code": "LA6674-1",
            "text": "Presumed Benign"
          }, {
            "code": "LA6675-8",
            "text": "Benign"
          }, {
            "code": "LA6676-6",
            "text": "Resistant"
          }, {
            "code": "LA6677-4",
            "text": "Responsive"
          }, {
            "code": "LA6678-2",
            "text": "Novel Presumed Non-Responsive"
          }, {
            "code": "LA6679-0",
            "text": "Novel Presumed Responsive"
          }, {
            "code": "LA6680-8",
            "text": "Unclassified"
          }, {
            "code": "LA6681-6",
            "text": "Polymorphism"
          }, {
            "code": "LA6682-4",
            "text": "Unknown Significance"
          }]
        },
        {"questionCode": "X1002-0",
          "question": "Possible associated phenotype",
          "dataType": "CWE",
          "answerCardinality": {"max": "1", "min":"0"},
          "externallyDefined":"https://clin-table-search.lhc.nlm.nih.gov/api/disease_names/v3/search",
          "dataControl": [
            {
              "source": {
                "sourceType":"INTERNAL",
                "sourceItemCode":"XXXXX-5"
              },
              "construction":"SIMPLE",
              "dataFormat": "value.data.phenotype",
              "onAttribute":"value"
            }
          ]
        }
      ]
    },
    {
      "questionCode": "titleHeader2",
      "question": "Complex Small Variants Section",
      "dataType": "TITLE",
      "skipLogic": {"conditions":[{"source": "XXXXX-12", "trigger": {"code": "C02"}}],
        "action": "show"},
      "header": true
    },
    {"questionCode": "XXXXX-20",
      "question": "Complex variants",
      "questionCardinality": {"max": "*", "min":"0"},
      "skipLogic": {"conditions":[{"source": "XXXXX-12", "trigger": {"code": "C02"}}],
        "action": "show"},
      "header": true,
      "items" : [
        {"questionCode": "XXXXX-5",
          "question": "Variant ID",
          "dataType": "CNE",
          "answerCardinality": {"max": "1", "min":"0"},
          "externallyDefined":"https://clin-table-search.lhc.nlm.nih.gov/api/variants/v3/search?df=VariantID,RefSeqID,GeneSymbol,NucleotideChange,AminoAcidChange&ef=RefSeqID,GeneSymbol,NucleotideChange,AminoAcidChange,phenotype,AlternateAllele,ReferenceAllele,Cytogenetic,dbSNP,VariantID,Name"
        },
        {"questionCode": "XXXXX-13",
          "question": "Variant name",
          "dataType": "ST",
          "dataControl": [
            {
              "source": {
                "sourceType":"INTERNAL",
                "sourceItemCode":"XXXXX-5"
              },
              "construction":"SIMPLE",
              "dataFormat": "value.data.Name",
              "onAttribute":"value"
            }
          ]
        },
        {"questionCode": "XXXXX-14",
          "question": "Variant type",
          "dataType": "CNE",
          "answers": [
            {"code": "V1", "text": "Haplotype"},
            {"code": "V2", "text": "Compound Het"},
            {"code": "V3", "text": "Other"}
          ]
        },
        {
          "questionCode": "XXXX1-1",
          "question": "Allele(s)",
          "questionCardinality": {
            "max": "*",
            "min": "1"
          },
          "header": true,
          "layout": "horizontal",
          "items": [
            {
              "questionCode": "XXXXX-18",
              "question": "ID",
              "dataType": "CWE",
              "answerCardinality": {
                "max": "1",
                "min": "0"
              },
              "externallyDefined": "https://clin-table-search.lhc.nlm.nih.gov/api/variants/v3/search?df=AlleleID,GeneSymbol",
              "displayControl": {
                "colCSS": [
                  {
                    "name": "width",
                    "value": "5em"
                  },
                  {
                    "name": "min-width",
                    "value": "2em"
                  }
                ]
              }
            },
            {
              "questionCode": "XXXXX-19",
              "question": "Type",
              "dataType": "CNE",
              "answerCardinality": {
                "max": "1",
                "min": "0"
              },
              "answers": [
                {"code": "C01", "text": "del"},
                {"code": "C02", "text": "dup"},
                {"code": "C03", "text": "fusion"},
                {"code": "C04", "text": "indel"},
                {"code": "C05", "text": "inser"},
                {"code": "C06", "text": "inver"},
                {"code": "C07", "text": "NT exp"},
                {"code": "C08", "text": "protein only"},
                {"code": "C09", "text": "shrt rpt"},
                {"code": "C10", "text": "SNP"},
                {"code": "C11", "text": "structural"},
                {"code": "C12", "text": "undet"}
              ],
              "displayControl": {
                "colCSS": [
                  {
                    "name": "width",
                    "value": "5em"
                  },
                  {
                    "name": "min-width",
                    "value": "2em"
                  }
                ]
              }
            },
            {"questionCode": "48018-6",
              "question": "Gene",
              "dataType": "CNE",
              "answerCardinality": {"max": "1", "min":"0"},
              "externallyDefined":"https://clin-table-search.lhc.nlm.nih.gov/api/genes/v3/search?df=symbol,name_mod",
              "dataControl": [
                {
                  "source": {
                    "sourceType":"INTERNAL",
                    "sourceItemCode":"XXXXX-5"
                  },
                  "construction":"OBJECT",
                  "dataFormat": {"code": "value.code", "text": "value.data.GeneSymbol"},
                  "onAttribute":"value"
                }
              ],
              "displayControl": {
                "colCSS": [{"name": "width", "value":"6em"},
                  {"name": "min-width", "value":"2em"}]
              }
            },
            {"questionCode": "48013-7",
              "question": "NM_RefSeq",
              "displayControl": {
                "colCSS": [{"name": "width", "value":"9em"},
                  {"name": "min-width", "value":"2em"}]
              }
            },
            {"questionCode": "41103-3",
              "question": "DNA change",
              "dataType": "ST",
              "displayControl": {
                "colCSS": [{"name": "width", "value":"50%"},
                  {"name": "min-width", "value":"2em"}]
              }
            },
            {"questionCode": "48005-3",
              "question": "AA change",
              "dataType": "ST",
              "displayControl": {
                "colCSS": [{"name": "width", "value":"50%"},
                  {"name": "min-width", "value":"2em"}]
              }
            },
            {"questionCode": "XXXXX-17",
              "question": "NC/NG_RefSeq",
              "displayControl": {
                "colCSS": [{"name": "width", "value":"9em"},
                  {"name": "min-width", "value":"2em"}]
              }
            },
            {"questionCode": "69547-8",
              "question": "Ref allele",
              "displayControl": {
                "colCSS": [{"name": "width", "value":"5em"},
                  {"name": "min-width", "value":"2em"}]
              }
            },
            {"questionCode": "X0029",
              "question": "Genomic loc",
              "displayControl": {
                "colCSS": [{"name": "width", "value":"5em"},
                  {"name": "min-width", "value":"2em"}]
              }

            },
            {"questionCode": "69551-0",
              "question": "Alt allele",
              "displayControl": {
                "colCSS": [{"name": "width", "value":"5em"},
                  {"name": "min-width", "value":"2em"}]
              }
            },
            {"questionCode": "XXXX2-13",
              "question": "Allelic Frequency NFR",
              "displayControl": {
                "colCSS": [{"name": "width", "value":"5em"},
                  {"name": "min-width", "value":"2em"}]
              }
            }
          ]
        },
        {"questionCode": "XXXXX-4",
          "question": "dbSNP ID for mutations",
          "dataType": "CNE",
          "answerCardinality": {"max": "1", "min":"0"},
          "externallyDefined":"https://clin-table-search.lhc.nlm.nih.gov/api/snps/v3/search",
          "skipLogic": {"conditions":[{"source": "XXXXX-2", "trigger": {"code": "C01"}}],
            "action": "show"},
          "dataControl": [
            {
              "source": {
                "sourceType":"INTERNAL",
                "sourceItemCode":"XXXXX-5"
              },
              "construction":"OBJECT",
              "dataFormat": {"code": "value.code", "text": "value.dbSNP"},
              "onAttribute":"value"
            }
          ]
        },
        {"questionCode": "XXXXX-7",
          "question": "COSMIC ID for mutations",
          "skipLogic": {"conditions":[{"source": "XXXXX-2", "trigger": {"code": "C05"}}],
            "action": "show"}
        },
        {"questionCode": "XXXXX-6",
          "question": "CIGAR specification for mutations",
          "skipLogic": {"conditions":[{"source": "XXXXX-2", "trigger": {"code": "C04"}}],
            "action": "show"}
        },
        {"questionCode": "X1001-0",
          "question": "Cytogenetic location",
          "dataType": "CWE",
          "answerCardinality": {"max": "1", "min":"0"},
          "externallyDefined": "https://clin-table-search.lhc.nlm.nih.gov/api/variants/v3/search?df=Cytogenetic",
          "dataControl": [
            {
              "source": {
                "sourceType":"INTERNAL",
                "sourceItemCode":"XXXXX-5"
              },
              "construction":"OBJECT",
              "dataFormat": {"code": "value.code", "text": "value.Cytogenetic"},
              "onAttribute":"value"
            }
          ]
        },
        {
          "questionCode":"53034-5",
          "localQuestionCode":null,
          "dataType":"CNE",
          "header":false,
          "units":null,
          "codingInstructions":"The level of occurrence of a single DNA Marker within a set of chromosomes. Heterozygous indicates the DNA Marker is only present in one of the two genes contained in homologous chromosomes. Homozygous indicates the DNA Marker is present in both genes contained in homologous chromosomes. Hemizygous indicates the DNA Marker exists in the only single copy of a gene in a non-homologous chromosome (The male X and Y chromosome are non-homologous). Hemiplasmic indicates that the DNA Marker is present in some but not all of the copies of mitochondrial DNA. Homoplasmic indicates that the DNA Maker is present in all of the copies of mitochondrial DNA.\r\n",
          "copyrightNotice":null,
          "questionCardinality":null,
          "answerCardinality":{
            "min":"0",
            "max":"1"
          },
          "question":"Allelic state",
          "answers":[
            {
              "label":null,
              "code":"LA6703-8",
              "text":"Heteroplasmic",
              "score":null,
              "other":null
            },
            {
              "label":null,
              "code":"LA6704-6",
              "text":"Homoplasmic",
              "score":null,
              "other":null
            },
            {
              "label":null,
              "code":"LA6705-3",
              "text":"Homozygous",
              "score":null,
              "other":null
            },
            {
              "label":null,
              "code":"LA6706-1",
              "text":"Heterozygous",
              "score":null,
              "other":null
            },
            {
              "label":null,
              "code":"LA6707-9",
              "text":"Hemizygous",
              "score":null,
              "other":null
            }
          ],
          "skipLogic":null,
          "restrictions":null,
          "editable":null,
          "defaultAnswer":null,
          "displayControl":null,
          "calculationMethod":null,
          "items":null
        },
        {"questionCode": "53037-8",
          "question": "Clinical significance",
          "dataType": "CWE",
          "answerCardinality": {"max": "1", "min":"0"},
          "answers": [{
            "code": "LA6668-3",
            "text": "Pathogenic"
          }, {
            "code": "LA6669-1",
            "text": "Presumed Pathogenic"
          }, {
            "code": "LA6670-9",
            "text": "Novel Presumed Pathogenic"
          }, {
            "code": "LA6671-7",
            "text": "Novel Unknown Significance"
          }, {
            "code": "LA6672-5",
            "text": "Novel Presumed Benign"
          }, {
            "code": "LA6673-3",
            "text": "Novel"
          }, {
            "code": "LA6674-1",
            "text": "Presumed Benign"
          }, {
            "code": "LA6675-8",
            "text": "Benign"
          }, {
            "code": "LA6676-6",
            "text": "Resistant"
          }, {
            "code": "LA6677-4",
            "text": "Responsive"
          }, {
            "code": "LA6678-2",
            "text": "Novel Presumed Non-Responsive"
          }, {
            "code": "LA6679-0",
            "text": "Novel Presumed Responsive"
          }, {
            "code": "LA6680-8",
            "text": "Unclassified"
          }, {
            "code": "LA6681-6",
            "text": "Polymorphism"
          }, {
            "code": "LA6682-4",
            "text": "Unknown Significance"
          }]
        },
        {"questionCode": "X1002-0",
          "question": "Possible associated phenotype",
          "dataType": "CWE",
          "answerCardinality": {"max": "1", "min":"0"},
          "externallyDefined":"https://clin-table-search.lhc.nlm.nih.gov/api/disease_names/v3/search",
          "dataControl": [
            {
              "source": {
                "sourceType":"INTERNAL",
                "sourceItemCode":"XXXXX-5"
              },
              "construction":"SIMPLE",
              "dataFormat": "value.phenotype",
              "onAttribute":"value"
            }
          ]
        }
      ]
    },
    {
      "questionCode": "titleHeader3",
      "question": "Structural (Copy Number) Variants Section",
      "dataType": "TITLE",
      "skipLogic": {"conditions":[{"source": "XXXXX-12", "trigger": {"code": "C03"}}],
        "action": "show"},
      "header": true
    },
    {"questionCode": "XXXX2-9",
      "question": "Structural (copy number) variants",
      "questionCardinality": {"max": "*", "min":"0"},
      "skipLogic": {"conditions":[{"source": "XXXXX-12", "trigger": {"code": "C03"}}],
        "action": "show"},
      "header": true,
      "items" : [
        {"questionCode": "XXXX2-11",
          "question": "Structural variant name",
          "dataType": "ST"
        },
        {"questionCode": "48018-6",
          "question": "Gene symbol",
          "dataType": "CNE",
          "answerCardinality": {"max": "1", "min":"0"},
          "externallyDefined":"https://clin-table-search.lhc.nlm.nih.gov/api/genes/v3/search?df=symbol,name_mod&ef=refseq_accession,location"
        },
        {"questionCode": "48013-7",
          "question": "Reference sequence ID",
          "dataType":"CWE",
          "externallyDefined":"https://clin-table-search.lhc.nlm.nih.gov/api/genes/v3/search?df=refseq_accession,name_mod&sf=symbol,refseq_accession",
          "dataControl": [
            {
              "source": {
                "sourceType":"INTERNAL",
                "sourceItemCode":"48018-6"
              },
              "construction":"OBJECT",
              "dataFormat": {"code": "value.code", "text": "value.refseq_accession"},
              "onAttribute":"value"
            }
          ]
        },
        {"questionCode": "X12313",
          "question": "Structural variant reported start-end",
          "dataType": "ST",
          "answerCardinality": {"max": "1", "min":"1"}
        },
        {"questionCode": "X12320",
          "question": "Precision of boundaries",
          "dataType": "CWE",
          "answerCardinality": {"max": "1", "min":"0"},
          "answers": [
            {"code": "1","text": "Exact"},
            {"code": "2","text": "Within 10^3 kb"},
            {"code": "3","text": "Within 10^4 kb"},
            {"code": "4","text": "Within 10^5 kb"},
            {"code": "5","text": "Within 10^6 kb"},
            {"code": "6","text": "Within 10^7 kb"}
          ]
        },
        {"questionCode": "X12314",
          "question": "Structural variant reported aCGH ratio",
          "dataType": "ST",
          "answerCardinality": {"max": "1", "min":"0"}
        },
        {"questionCode": "48019-4",
          "question": "DNA sequence variation type",
          "dataType": "CWE",
          "answerCardinality": {"max": "1", "min":"0"},
          "answers": [
            {"text":"Ref allele"    	    ,"code":"LA9658-1"},
            {"text":"Deletion"    	    	,"code":"LA6692-3"},
            {"text":"Duplication"    	  ,"code":"LA6686-5"},
            {"text":"Insertion"    	 	  ,"code":"LA6687-3"},
            {"text":"Insertion/Deletion" ,"code":"LA6688-1"},
            {"text":"Inversion"    	 	  ,"code":"LA6689-9"},
            {"text":"Substitution"    	 	,"code":"LA6690-7"}
          ]
        },
        {"questionCode": "X12315",
          "question": "Structural variant length",
          "dataType": "INT",
          "answerCardinality": {"max": "1", "min":"0"}
        },
        {"questionCode": "X12316",
          "question": "Structural variant outer start-end",
          "dataType": "ST",
          "answerCardinality": {"max": "1", "min":"0"}
        },
        {"questionCode": "X12317",
          "question": "Structural variant inner start-end",
          "dataType": "ST",
          "answerCardinality": {"max": "1", "min":"0"}
        },
        {"questionCode": "X12318",
          "question": "Structural variant HGVS",
          "dataType": "ST",
          "answerCardinality": {"max": "1", "min":"0"}
        },
        {"questionCode": "X12319",
          "question": "Structural variant ISCN",
          "dataType": "ST",
          "answerCardinality": {"max": "1", "min":"0"}
        },
        {"questionCode": "XXXX2-12",
          "question": "Structural variant cytogenetic location",
          "dataType": "ST"
        }
      ]
    }
  ]
};


var displayControlsDemo =
{
  "type": "LOINC",
  "code": "display-controls",
  "name": "displayControls (answerLayout and questionLayout)",
  "template": "table",
  "items": [
    {
      "questionCode": "q0",
      "question": "String type",
      "answerCardinality": {"min": "1", "max": "1"}
    },
    {
      "questionCode": "q1a",
      "question": "Answer RADIO_CHECKBOX layout --CNE, --2 columns",
      "copyrightNotice": "a notice",
      "codingInstructions": "coding instructions",
      "dataType": "CNE",
      "answerCardinality": {"min": "1", "max": "1"},
      "displayControl": {
        "answerLayout": {"type":"RADIO_CHECKBOX", "columns": "2"}
      },
      "answers": [
        {"code": "c1", "text": "Extra long answer text 123456789 Answer X"},
        {"code": "c2", "text": "Extra long answer text 123456789 Answer Y"},
        {"code": "c3", "text": "Extra long answer text 123456789 Answer Z"},
        {"code": "c4", "text": "Extra long answer text 1234 Answer X1"},
        {"code": "c5", "text": "Extra long answer text 12345 Answer X2"},
        {"code": "c6", "text": "Extra long answer text 123456 Answer X3"},
        {"code": "c7", "text": "Extra long answer text 1234567 Answer X4"},
        {"code": "c8", "text": "Extra long answer text 12345678 Answer X5"},
        {"code": "c9", "text": "Extra long answer text 123456789 Answer X6"}
      ],
      value:
        {"code": "c3", "text": "Extra long answer text 123456789 Answer Z"}
    },
    {
      "questionCode": "q1b",
      "question": "Answer RADIO_CHECKBOX layout --CWE, --3 columns",
      "copyrightNotice": "a notice",
      "codingInstructions": "coding instructions",
      "dataType": "CWE",
      "answerCardinality": {"min": "0", "max": "1"},
      "displayControl": {
        "answerLayout": {"type":"RADIO_CHECKBOX", "columns": "3"}
      },
      "answers": [
        {"code": "c1", "text": "Long answer text 123 Answer X"},
        {"code": "c2", "text": "Long answer text 123456 Answer Y"},
        {"code": "c3", "text": "Long answer text 123456789 Answer Z"},
        {"code": "c4", "text": "Extra long answer text 1234 Answer X1"},
        {"code": "c5", "text": "Extra long answer text 12345 Answer X2"},
        {"code": "c6", "text": "Extra long answer text 123456 Answer X3"},
        {"code": "c7", "text": "Extra long answer text 1234567 Answer X4"},
        {"code": "c8", "text": "Extra long answer text 12345678 Answer X5"},
        {"code": "c9", "text": "Extra long answer text 123456789 Answer X6"}

      ]
    },
    {
      "questionCode": "q1c",
      "question": "Answer RADIO_CHECKBOX layout --CNE, Multiple, --1 column",
      "copyrightNotice": "a notice",
      "codingInstructions": "coding instructions",
      "dataType": "CNE",
      "answerCardinality": {"min": "0", "max": "*"},
      "displayControl": {
        "answerLayout": {"type":"RADIO_CHECKBOX", "columns": "1"}
      },
      "answers": [
        {"code": "c1", "text": "Answer X"},
        {"code": "c2", "text": "Answer Y"},
        {"code": "c3", "text": "Answer Z"},
        {"code": "c4", "text": "Extra long answer text 1234 Answer X1"},
        {"code": "c5", "text": "Extra long answer text 12345 Answer X2"},
        {"code": "c6", "text": "Extra long answer text 123456 Answer X3"},
        {"code": "c7", "text": "Extra long answer text 1234567 Answer X4"},
        {"code": "c8", "text": "Extra long answer text 12345678 Answer X5"},
        {"code": "c9", "text": "Extra long answer text 123456789 Answer X6"}
      ],
      value: [
        {"code": "c2", "text": "Answer Y"},
        {"code": "c3", "text": "Answer Z"}
      ]
    },
    {
      "questionCode": "q1d",
      "question": "Answer RADIO_CHECKBOX layout --CWE, Multiple, --flexible",
      "copyrightNotice": "a notice",
      "codingInstructions": "coding instructions",
      "dataType": "CWE",
      "answerCardinality": {"min": "0", "max": "*"},
      "displayControl": {
        "answerLayout": {"type":"RADIO_CHECKBOX", "columns": "0"}
      },
      "answers": [
        {"code": "c1", "text": "Answer X"},
        {"code": "c2", "text": "Answer Y"},
        {"code": "c3", "text": "Answer Z"},
        {"code": "c4", "text": "Extra long answer text 1234 Answer X1"},
        {"code": "c5", "text": "Extra long answer text 12345 Answer X2"},
        {"code": "c6", "text": "Extra long answer text 123456 Answer X3"},
        {"code": "c7", "text": "Extra long answer text 1234567 Answer X4"},
        {"code": "c8", "text": "Extra long answer text 12345678 Answer X5"},
        {"code": "c9", "text": "Extra long answer text 123456789 Answer X6"}

      ]
    },
    {
      "questionCode": "g1",
      "question": "A repeating group",
      "header": true,
      "questionCardinality": {"min": "1", "max":"*"},
      "displayControl": {"questionLayout":"vertical"},
      "items": [
        {
          "questionCode": "g1m1",
          "dataType": "CNE",
          "question": "Question #1",
          "answerCardinality": {"min": "1", "max": "1"},
          "answers": [
            {"code": "c1", "text": "Answer 1"},
            {"code": "c2", "text": "Answer 2"},
            {"code": "c3", "text": "Answer 3"},
            {"code": "c4", "text": "Answer 4"}]
        },
        {
          "questionCode": "g1m2",
          "dataType": "CNE",
          "question": "Question #2",
          "answers": [
            {"code": "c1", "text": "Answer 1"},
            {"code": "c2", "text": "Answer 2"},
            {"code": "c3", "text": "Answer 3"},
            {"code": "c4", "text": "Answer 4"}]
        },
        {
          "questionCode": "g1m3",
          "dataType": "CNE",
          "question": "Question #3",
          "answers": [
            {"code": "c1", "text": "Answer 1"},
            {"code": "c2", "text": "Answer 2"},
            {"code": "c3", "text": "Answer 3"},
            {"code": "c4", "text": "Answer 4"}]
        },
        {
          "questionCode": "g1m4",
          "dataType": "CNE",
          "answerCardinality": {"min": "0", "max": "*"},
          "question": "Question #4",
          "answers": [
            {"code": "c1", "text": "Answer 1"},
            {"code": "c2", "text": "Answer 2"},
            {"code": "c3", "text": "Answer 3"},
            {"code": "c4", "text": "Answer 4"}]
        },
        {
          "questionCode": "g1g2",
          "question": "repeating section in a repeating section",
          "header": true,
          "questionCardinality": {"min": "1", "max":"*"},
          "items": [
            {
              "questionCode": "g1g2q1",
              "dataType": "CNE",
              "question": "Question #A",
              "answerCardinality": {"min": "1", "max": "1"},
              "answers": [
                {"code": "c1", "text": "Answer 1"},
                {"code": "c2", "text": "Answer 2"},
                {"code": "c3", "text": "Answer 3"},
                {"code": "c4", "text": "Answer 4"}]
            },
            {
              "questionCode": "g1g2q2",
              "dataType": "CNE",
              "answerCardinality": {"min": "0", "max": "*"},
              "question": "Question #B",
              "answers": [
                {"code": "c1", "text": "Answer 1"},
                {"code": "c2", "text": "Answer 2"},
                {"code": "c3", "text": "Answer 3"},
                {"code": "c4", "text": "Answer 4"}]
            }

          ]
        }
      ]
    },
    {
      "questionCode": "g2",
      "question": "A repeating group with horizontal layout",
      "header": true,
      "questionCardinality": {"min": "1", "max":"*"},
      "displayControl": {"questionLayout":"horizontal"},
      "items": [
      {
        "questionCode": "g1m1",
        "dataType": "CNE",
        "question": "Question #1",
        "answerCardinality": {"min": "1", "max": "1"},
        "answers": [
          {"code": "c1", "text": "Answer 1"},
          {"code": "c2", "text": "Answer 2"},
          {"code": "c3", "text": "Answer 3"},
          {"code": "c4", "text": "Answer 4"}]
      },
      {
        "questionCode": "g1m2",
        "dataType": "CNE",
        "question": "Question #2",
        "answers": [
          {"code": "c1", "text": "Answer 1"},
          {"code": "c2", "text": "Answer 2"},
          {"code": "c3", "text": "Answer 3"},
          {"code": "c4", "text": "Answer 4"}]
      },
      {
        "questionCode": "g1m3",
        "dataType": "CNE",
        "question": "Question #3",
        "answers": [
          {"code": "c1", "text": "Answer 1"},
          {"code": "c2", "text": "Answer 2"},
          {"code": "c3", "text": "Answer 3"},
          {"code": "c4", "text": "Answer 4"}]
      },
      {
        "questionCode": "g1m4",
        "dataType": "CNE",
        "answerCardinality": {"min": "0", "max": "*"},
        "question": "Question #4",
        "answers": [
          {"code": "c1", "text": "Answer 1"},
          {"code": "c2", "text": "Answer 2"},
          {"code": "c3", "text": "Answer 3"},
          {"code": "c4", "text": "Answer 4"}]
      }]
    },
    {
      "questionCode": "g3",
      "question": "A non-repeating group with horizontal layout",
      "header": true,
      "codingInstructions": "a coding instruction string",
      "copyrightNotice": "a copyright notice",
      "questionCardinality": {"min": "1", "max":"1"},
      "displayControl": {"questionLayout":"horizontal"},
      "items": [
        {
          "questionCode": "g1m1",
          "dataType": "CNE",
          "question": "Question #1",
          "answerCardinality": {"min": "1", "max": "1"},
          "answers": [
            {"code": "c1", "text": "Answer 1"},
            {"code": "c2", "text": "Answer 2"},
            {"code": "c3", "text": "Answer 3"},
            {"code": "c4", "text": "Answer 4"}]
        },
        {
          "questionCode": "g1m2",
          "dataType": "CNE",
          "question": "Question #2",
          "answers": [
            {"code": "c1", "text": "Answer 1"},
            {"code": "c2", "text": "Answer 2"},
            {"code": "c3", "text": "Answer 3"},
            {"code": "c4", "text": "Answer 4"}]
        },
        {
          "questionCode": "g1m3",
          "dataType": "CNE",
          "question": "Question #3",
          "answers": [
            {"code": "c1", "text": "Answer 1"},
            {"code": "c2", "text": "Answer 2"},
            {"code": "c3", "text": "Answer 3"},
            {"code": "c4", "text": "Answer 4"}]
        },
        {
          "questionCode": "g1m4",
          "dataType": "CNE",
          "answerCardinality": {"min": "0", "max": "*"},
          "question": "Question #4",
          "answers": [
            {"code": "c1", "text": "Answer 1"},
            {"code": "c2", "text": "Answer 2"},
            {"code": "c3", "text": "Answer 3"},
            {"code": "c4", "text": "Answer 4"}]
        }]
    },
    {
      "questionCode": "g4",
      "question": "A group with matrix layout (non-repeating)",
      "header": true,
      "codingInstructions": "a coding instruction string",
      "copyrightNotice": "a copyright notice",
      "questionCardinality": {"min": "1", "max":"1"},
      "displayControl": {"questionLayout":"matrix"},
      "items": [
        {
          "questionCode": "g1m1",
          "dataType": "CNE",
          "answerCardinality": {"min": "0", "max": "*"},
          "question": "Question #1",
          "answers": [
            {"code": "c1", "text": "Answer 1"},
            {"code": "c2", "text": "Answer 2"},
            {"code": "c3", "text": "Answer 3"},
            {"code": "c4", "text": "Answer 4"}]
        },
        {
          "questionCode": "g1m2",
          "dataType": "CNE",
          "answerCardinality": {"min": "0", "max": "*"},
          "question": "Question #2",
          "answers": [
            {"code": "c1", "text": "Answer 1"},
            {"code": "c2", "text": "Answer 2"},
            {"code": "c3", "text": "Answer 3"},
            {"code": "c4", "text": "Answer 4"}]
        },
        {
          "questionCode": "g1m3",
          "dataType": "CNE",
          "answerCardinality": {"min": "0", "max": "*"},
          "question": "Question #3",
          "answers": [
            {"code": "c1", "text": "Answer 1"},
            {"code": "c2", "text": "Answer 2"},
            {"code": "c3", "text": "Answer 3"},
            {"code": "c4", "text": "Answer 4"}]
        },
        {
          "questionCode": "g1m4",
          "dataType": "CNE",
          "answerCardinality": {"min": "0", "max": "*"},
          "question": "Question #4",
          "answers": [
            {"code": "c1", "text": "Answer 1"},
            {"code": "c2", "text": "Answer 2"},
            {"code": "c3", "text": "Answer 3"},
            {"code": "c4", "text": "Answer 4"}]
        }]
    },
    {
      "questionCode": "q3",
      "question": "Question after a repeating section",
      "dataType": "CNE",
      "answerCardinality": {"min": "0", "max": "1"},
      "answers": [
        {"code": "c1", "text": "Answer A"},
        {"code": "c2", "text": "Answer B"},
        {"code": "c3", "text": "Answer C"}
      ]
    }

  ]
};


var matrixLayout =
{
  "type": "LOINC",
  "code": "matrix-layout",
  "name": "A form with matrix layout, multiple selections",
  "copyrightNotice": "This question is not copyrighted",
  "codingInstructions": "Choose answer 1 for best results",
  "template": "table",
  "templateOptions": {
    "displayControl": {"questionLayout":"matrix"},
  },
  "items": [
    {
      "questionCode": "g1m1",
      "dataType": "CWE",
      "answerCardinality": {"min": "0", "max": "*"},
      "question": "Question #1",
      "copyrightNotice": "This question is not copyrighted",
      "codingInstructions": "Choose answer 1 for best results",
      "answers": [
        {"code": "c1", "text": "Answer 1"},
        {"code": "c2", "text": "Answer 2"},
        {"code": "c3", "text": "Answer 3"},
        {"code": "c4", "text": "Answer 4"}]
    },
    {
      "questionCode": "g1m2",
      "dataType": "CWE",
      "answerCardinality": {"min": "0", "max": "*"},
      "question": "Question #2",
      "answers": [
        {"code": "c1", "text": "Answer 1"},
        {"code": "c2", "text": "Answer 2"},
        {"code": "c3", "text": "Answer 3"},
        {"code": "c4", "text": "Answer 4"}]
    },
    {
      "questionCode": "g1m3",
      "dataType": "CWE",
      "answerCardinality": {"min": "0", "max": "*"},
      "question": "Question #3",
      "answers": [
        {"code": "c1", "text": "Answer 1"},
        {"code": "c2", "text": "Answer 2"},
        {"code": "c3", "text": "Answer 3"},
        {"code": "c4", "text": "Answer 4"}]
    },
    {
      "questionCode": "g1m4",
      "dataType": "CWE",
      "answerCardinality": {"min": "0", "max": "*"},
      "question": "Question #4",
      "answers": [
        {"code": "c1", "text": "Answer 1"},
        {"code": "c2", "text": "Answer 2"},
        {"code": "c3", "text": "Answer 3"},
        {"code": "c4", "text": "Answer 4"}]
    }]
};


var matrixLayout2 =
{
  "type": "LOINC",
  "code": "matrix-layout2",
  "name": "Another form with matrix layout, single selection",
  "template": "table",
  "templateOptions": {
    "displayControl": {"questionLayout":"matrix"},
  },
  "items": [
    {
      "questionCode": "g1m1",
      "dataType": "CNE",
      "answerCardinality": {"min": "0", "max": "1"},
      "question": "Question #1",
      "answers": [
        {"code": "c1", "text": "Answer a"},
        {"code": "c2", "text": "Answer b"},
        {"code": "c3", "text": "Answer c"},
        {"code": "c4", "text": "Answer d"}]
    },
    {
      "questionCode": "g1m2",
      "dataType": "CNE",
      "answerCardinality": {"min": "0", "max": "1"},
      "question": "Question #2",
      "answers": [
        {"code": "c1", "text": "Answer a"},
        {"code": "c2", "text": "Answer b"},
        {"code": "c3", "text": "Answer c"},
        {"code": "c4", "text": "Answer d"}]
    },
    {
      "questionCode": "g1m3",
      "dataType": "CNE",
      "answerCardinality": {"min": "0", "max": "1"},
      "question": "Question #3",
      "answers": [
        {"code": "c1", "text": "Answer a"},
        {"code": "c2", "text": "Answer b"},
        {"code": "c3", "text": "Answer c"},
        {"code": "c4", "text": "Answer d"}]
    },
    {
      "questionCode": "g1m4",
      "dataType": "CNE",
      "answerCardinality": {"min": "0", "max": "1"},
      "question": "Question #4",
      "answers": [
        {"code": "c1", "text": "Answer a"},
        {"code": "c2", "text": "Answer b"},
        {"code": "c3", "text": "Answer c"},
        {"code": "c4", "text": "Answer d"}]
    }]
};


var promis = {
      "type": "LOINC",
      "code": "76806-9",
      "name": "PROMIS item bank - social isolation - version 2.0",
      "template": "list",
      "templateOptions": {
        "displayControl": {"questionLayout":"matrix"}
      },
      "copyrightNotice": "Copyright © 2010 PROMIS Health Organization or other individuals/entities that have contributed information and materials to Assessment Center, and are being used with the permission of the copyright holders. Use of PROMIS instruments (e.g., item banks, short forms, profile measures) are subject to the PROMIS Terms and Conditions available at: http://www.assessmentcenter.net/TandC.aspx",
      "items": [{
        "questionCode": "76883-8",
        "localQuestionCode": null,
        "dataType": "CNE",
        "header": false,
        "units": null,
        "codingInstructions": null,
        "copyrightNotice": "Copyright © 2010 PROMIS Health Organization or other individuals/entities that have contributed information and materials to Assessment Center, and are being used with the permission of the copyright holders. Use of PROMIS instruments (e.g., item banks, short forms, profile measures) are subject to the PROMIS Terms and Conditions available at: http://www.assessmentcenter.net/TandC.aspx",
        "question": "People get the wrong idea about my situation",
        "answers": [{"label": null, "code": "LA6270-8", "text": "Never", "score": 5, "other": null}, {
          "label": null,
          "code": "LA10066-1",
          "text": "Rarely",
          "score": 4,
          "other": null
        }, {"label": null, "code": "LA10082-8", "text": "Sometimes", "score": 3, "other": null}, {
          "label": null,
          "code": "LA14747-2",
          "text": "Usually",
          "score": 2,
          "other": null
        }, {"label": null, "code": "LA9933-8", "text": "Always", "score": 1, "other": null}],
        "skipLogic": null,
        "restrictions": null,
        "defaultAnswer": null,
        "formatting": null,
        "calculationMethod": null,
        "items": null
      }, {
        "questionCode": "76757-4",
        "localQuestionCode": null,
        "dataType": "CNE",
        "header": false,
        "units": null,
        "codingInstructions": null,
        "copyrightNotice": "Copyright © 2010 PROMIS Health Organization or other individuals/entities that have contributed information and materials to Assessment Center, and are being used with the permission of the copyright holders. Use of PROMIS instruments (e.g., item banks, short forms, profile measures) are subject to the PROMIS Terms and Conditions available at: http://www.assessmentcenter.net/TandC.aspx",
        "question": "I feel isolated even when I am not alone",
        "answers": [{"label": null, "code": "LA6270-8", "text": "Never", "score": 1, "other": null}, {
          "label": null,
          "code": "LA10066-1",
          "text": "Rarely",
          "score": 2,
          "other": null
        }, {"label": null, "code": "LA10082-8", "text": "Sometimes", "score": 3, "other": null}, {
          "label": null,
          "code": "LA14747-2",
          "text": "Usually",
          "score": 4,
          "other": null
        }, {"label": null, "code": "LA9933-8", "text": "Always", "score": 5, "other": null}],
        "skipLogic": null,
        "restrictions": null,
        "defaultAnswer": null,
        "formatting": null,
        "calculationMethod": null,
        "items": null
      }, {
        "questionCode": "76758-2",
        "localQuestionCode": null,
        "dataType": "CNE",
        "header": false,
        "units": null,
        "codingInstructions": null,
        "copyrightNotice": "Copyright © 2010 PROMIS Health Organization or other individuals/entities that have contributed information and materials to Assessment Center, and are being used with the permission of the copyright holders. Use of PROMIS instruments (e.g., item banks, short forms, profile measures) are subject to the PROMIS Terms and Conditions available at: http://www.assessmentcenter.net/TandC.aspx",
        "question": "I feel that people avoid talking to me",
        "answers": [{"label": null, "code": "LA6270-8", "text": "Never", "score": 1, "other": null}, {
          "label": null,
          "code": "LA10066-1",
          "text": "Rarely",
          "score": 2,
          "other": null
        }, {"label": null, "code": "LA10082-8", "text": "Sometimes", "score": 3, "other": null}, {
          "label": null,
          "code": "LA14747-2",
          "text": "Usually",
          "score": 4,
          "other": null
        }, {"label": null, "code": "LA9933-8", "text": "Always", "score": 5, "other": null}],
        "skipLogic": null,
        "restrictions": null,
        "defaultAnswer": null,
        "formatting": null,
        "calculationMethod": null,
        "items": null
      }, {
        "questionCode": "76759-0",
        "localQuestionCode": null,
        "dataType": "CNE",
        "header": false,
        "units": null,
        "codingInstructions": null,
        "copyrightNotice": "Copyright © 2010 PROMIS Health Organization or other individuals/entities that have contributed information and materials to Assessment Center, and are being used with the permission of the copyright holders. Use of PROMIS instruments (e.g., item banks, short forms, profile measures) are subject to the PROMIS Terms and Conditions available at: http://www.assessmentcenter.net/TandC.aspx",
        "question": "I feel detached from other people",
        "answers": [{"label": null, "code": "LA6270-8", "text": "Never", "score": 1, "other": null}, {
          "label": null,
          "code": "LA10066-1",
          "text": "Rarely",
          "score": 2,
          "other": null
        }, {"label": null, "code": "LA10082-8", "text": "Sometimes", "score": 3, "other": null}, {
          "label": null,
          "code": "LA14747-2",
          "text": "Usually",
          "score": 4,
          "other": null
        }, {"label": null, "code": "LA9933-8", "text": "Always", "score": 5, "other": null}],
        "skipLogic": null,
        "restrictions": null,
        "defaultAnswer": null,
        "formatting": null,
        "calculationMethod": null,
        "items": null
      }, {
        "questionCode": "76884-6",
        "localQuestionCode": null,
        "dataType": "CNE",
        "header": false,
        "units": null,
        "codingInstructions": null,
        "copyrightNotice": "Copyright © 2010 PROMIS Health Organization or other individuals/entities that have contributed information and materials to Assessment Center, and are being used with the permission of the copyright holders. Use of PROMIS instruments (e.g., item banks, short forms, profile measures) are subject to the PROMIS Terms and Conditions available at: http://www.assessmentcenter.net/TandC.aspx",
        "question": "I feel that some of my friends avoid me",
        "answers": [{"label": null, "code": "LA6270-8", "text": "Never", "score": 5, "other": null}, {
          "label": null,
          "code": "LA10066-1",
          "text": "Rarely",
          "score": 4,
          "other": null
        }, {"label": null, "code": "LA10082-8", "text": "Sometimes", "score": 3, "other": null}, {
          "label": null,
          "code": "LA14747-2",
          "text": "Usually",
          "score": 2,
          "other": null
        }, {"label": null, "code": "LA9933-8", "text": "Always", "score": 1, "other": null}],
        "skipLogic": null,
        "restrictions": null,
        "defaultAnswer": null,
        "formatting": null,
        "calculationMethod": null,
        "items": null
      }, {
        "questionCode": "76885-3",
        "localQuestionCode": null,
        "dataType": "CNE",
        "header": false,
        "units": null,
        "codingInstructions": null,
        "copyrightNotice": "Copyright © 2010 PROMIS Health Organization or other individuals/entities that have contributed information and materials to Assessment Center, and are being used with the permission of the copyright holders. Use of PROMIS instruments (e.g., item banks, short forms, profile measures) are subject to the PROMIS Terms and Conditions available at: http://www.assessmentcenter.net/TandC.aspx",
        "question": "I feel that some of my family members avoid me",
        "answers": [{"label": null, "code": "LA6270-8", "text": "Never", "score": 5, "other": null}, {
          "label": null,
          "code": "LA10066-1",
          "text": "Rarely",
          "score": 4,
          "other": null
        }, {"label": null, "code": "LA10082-8", "text": "Sometimes", "score": 3, "other": null}, {
          "label": null,
          "code": "LA14747-2",
          "text": "Usually",
          "score": 2,
          "other": null
        }, {"label": null, "code": "LA9933-8", "text": "Always", "score": 1, "other": null}],
        "skipLogic": null,
        "restrictions": null,
        "defaultAnswer": null,
        "formatting": null,
        "calculationMethod": null,
        "items": null
      }, {
        "questionCode": "76887-9",
        "localQuestionCode": null,
        "dataType": "CNE",
        "header": false,
        "units": null,
        "codingInstructions": null,
        "copyrightNotice": "Copyright © 2010 PROMIS Health Organization or other individuals/entities that have contributed information and materials to Assessment Center, and are being used with the permission of the copyright holders. Use of PROMIS instruments (e.g., item banks, short forms, profile measures) are subject to the PROMIS Terms and Conditions available at: http://www.assessmentcenter.net/TandC.aspx",
        "question": "I feel that I am alone in my interests and ideas",
        "answers": [{"label": null, "code": "LA6270-8", "text": "Never", "score": 5, "other": null}, {
          "label": null,
          "code": "LA10066-1",
          "text": "Rarely",
          "score": 4,
          "other": null
        }, {"label": null, "code": "LA10082-8", "text": "Sometimes", "score": 3, "other": null}, {
          "label": null,
          "code": "LA14747-2",
          "text": "Usually",
          "score": 2,
          "other": null
        }, {"label": null, "code": "LA9933-8", "text": "Always", "score": 1, "other": null}],
        "skipLogic": null,
        "restrictions": null,
        "defaultAnswer": null,
        "formatting": null,
        "calculationMethod": null,
        "items": null
      }, {
        "questionCode": "76762-4",
        "localQuestionCode": null,
        "dataType": "CNE",
        "header": false,
        "units": null,
        "codingInstructions": null,
        "copyrightNotice": "Copyright © 2010 PROMIS Health Organization or other individuals/entities that have contributed information and materials to Assessment Center, and are being used with the permission of the copyright holders. Use of PROMIS instruments (e.g., item banks, short forms, profile measures) are subject to the PROMIS Terms and Conditions available at: http://www.assessmentcenter.net/TandC.aspx",
        "question": "I feel that people barely know me",
        "answers": [{"label": null, "code": "LA6270-8", "text": "Never", "score": 1, "other": null}, {
          "label": null,
          "code": "LA10066-1",
          "text": "Rarely",
          "score": 2,
          "other": null
        }, {"label": null, "code": "LA10082-8", "text": "Sometimes", "score": 3, "other": null}, {
          "label": null,
          "code": "LA14747-2",
          "text": "Usually",
          "score": 4,
          "other": null
        }, {"label": null, "code": "LA9933-8", "text": "Always", "score": 5, "other": null}],
        "skipLogic": null,
        "restrictions": null,
        "defaultAnswer": null,
        "formatting": null,
        "calculationMethod": null,
        "items": null
      }, {
        "questionCode": "76760-8",
        "localQuestionCode": null,
        "dataType": "CNE",
        "header": false,
        "units": null,
        "codingInstructions": null,
        "copyrightNotice": "Copyright © 2010 PROMIS Health Organization or other individuals/entities that have contributed information and materials to Assessment Center, and are being used with the permission of the copyright holders. Use of PROMIS instruments (e.g., item banks, short forms, profile measures) are subject to the PROMIS Terms and Conditions available at: http://www.assessmentcenter.net/TandC.aspx",
        "question": "I feel like a stranger to those around me",
        "answers": [{"label": null, "code": "LA6270-8", "text": "Never", "score": 1, "other": null}, {
          "label": null,
          "code": "LA10066-1",
          "text": "Rarely",
          "score": 2,
          "other": null
        }, {"label": null, "code": "LA10082-8", "text": "Sometimes", "score": 3, "other": null}, {
          "label": null,
          "code": "LA14747-2",
          "text": "Usually",
          "score": 4,
          "other": null
        }, {"label": null, "code": "LA9933-8", "text": "Always", "score": 5, "other": null}],
        "skipLogic": null,
        "restrictions": null,
        "defaultAnswer": null,
        "formatting": null,
        "calculationMethod": null,
        "items": null
      }, {
        "questionCode": "76882-0",
        "localQuestionCode": null,
        "dataType": "CNE",
        "header": false,
        "units": null,
        "codingInstructions": null,
        "copyrightNotice": "Copyright © 2010 PROMIS Health Organization or other individuals/entities that have contributed information and materials to Assessment Center, and are being used with the permission of the copyright holders. Use of PROMIS instruments (e.g., item banks, short forms, profile measures) are subject to the PROMIS Terms and Conditions available at: http://www.assessmentcenter.net/TandC.aspx",
        "question": "I find that friends or relatives have difficulty talking with me about my health",
        "answers": [{"label": null, "code": "LA6270-8", "text": "Never", "score": 5, "other": null}, {
          "label": null,
          "code": "LA10066-1",
          "text": "Rarely",
          "score": 4,
          "other": null
        }, {"label": null, "code": "LA10082-8", "text": "Sometimes", "score": 3, "other": null}, {
          "label": null,
          "code": "LA14747-2",
          "text": "Usually",
          "score": 2,
          "other": null
        }, {"label": null, "code": "LA9933-8", "text": "Always", "score": 1, "other": null}],
        "skipLogic": null,
        "restrictions": null,
        "defaultAnswer": null,
        "formatting": null,
        "calculationMethod": null,
        "items": null
      }, {
        "questionCode": "76764-0",
        "localQuestionCode": null,
        "dataType": "CNE",
        "header": false,
        "units": null,
        "codingInstructions": null,
        "copyrightNotice": "Copyright © 2010 PROMIS Health Organization or other individuals/entities that have contributed information and materials to Assessment Center, and are being used with the permission of the copyright holders. Use of PROMIS instruments (e.g., item banks, short forms, profile measures) are subject to the PROMIS Terms and Conditions available at: http://www.assessmentcenter.net/TandC.aspx",
        "question": "I feel that people are around me but not with me",
        "answers": [{"label": null, "code": "LA6270-8", "text": "Never", "score": 1, "other": null}, {
          "label": null,
          "code": "LA10066-1",
          "text": "Rarely",
          "score": 2,
          "other": null
        }, {"label": null, "code": "LA10082-8", "text": "Sometimes", "score": 3, "other": null}, {
          "label": null,
          "code": "LA14747-2",
          "text": "Usually",
          "score": 4,
          "other": null
        }, {"label": null, "code": "LA9933-8", "text": "Always", "score": 5, "other": null}],
        "skipLogic": null,
        "restrictions": null,
        "defaultAnswer": null,
        "formatting": null,
        "calculationMethod": null,
        "items": null
      }, {
        "questionCode": "76763-2",
        "localQuestionCode": null,
        "dataType": "CNE",
        "header": false,
        "units": null,
        "codingInstructions": null,
        "copyrightNotice": "Copyright © 2010 PROMIS Health Organization or other individuals/entities that have contributed information and materials to Assessment Center, and are being used with the permission of the copyright holders. Use of PROMIS instruments (e.g., item banks, short forms, profile measures) are subject to the PROMIS Terms and Conditions available at: http://www.assessmentcenter.net/TandC.aspx",
        "question": "I feel isolated from others",
        "answers": [{"label": null, "code": "LA6270-8", "text": "Never", "score": 1, "other": null}, {
          "label": null,
          "code": "LA10066-1",
          "text": "Rarely",
          "score": 2,
          "other": null
        }, {"label": null, "code": "LA10082-8", "text": "Sometimes", "score": 3, "other": null}, {
          "label": null,
          "code": "LA14747-2",
          "text": "Usually",
          "score": 4,
          "other": null
        }, {"label": null, "code": "LA9933-8", "text": "Always", "score": 5, "other": null}],
        "skipLogic": null,
        "restrictions": null,
        "defaultAnswer": null,
        "formatting": null,
        "calculationMethod": null,
        "items": null
      }, {
        "questionCode": "76761-6",
        "localQuestionCode": null,
        "dataType": "CNE",
        "header": false,
        "units": null,
        "codingInstructions": null,
        "copyrightNotice": "Copyright © 2010 PROMIS Health Organization or other individuals/entities that have contributed information and materials to Assessment Center, and are being used with the permission of the copyright holders. Use of PROMIS instruments (e.g., item banks, short forms, profile measures) are subject to the PROMIS Terms and Conditions available at: http://www.assessmentcenter.net/TandC.aspx",
        "question": "I feel left out",
        "answers": [{"label": null, "code": "LA6270-8", "text": "Never", "score": 1, "other": null}, {
          "label": null,
          "code": "LA10066-1",
          "text": "Rarely",
          "score": 2,
          "other": null
        }, {"label": null, "code": "LA10082-8", "text": "Sometimes", "score": 3, "other": null}, {
          "label": null,
          "code": "LA14747-2",
          "text": "Usually",
          "score": 4,
          "other": null
        }, {"label": null, "code": "LA9933-8", "text": "Always", "score": 5, "other": null}],
        "skipLogic": null,
        "restrictions": null,
        "defaultAnswer": null,
        "formatting": null,
        "calculationMethod": null,
        "items": null
      }, {
        "questionCode": "76886-1",
        "localQuestionCode": null,
        "dataType": "CNE",
        "header": false,
        "units": null,
        "codingInstructions": null,
        "copyrightNotice": "Copyright © 2010 PROMIS Health Organization or other individuals/entities that have contributed information and materials to Assessment Center, and are being used with the permission of the copyright holders. Use of PROMIS instruments (e.g., item banks, short forms, profile measures) are subject to the PROMIS Terms and Conditions available at: http://www.assessmentcenter.net/TandC.aspx",
        "question": "I feel that I am no longer close to anyone",
        "answers": [{"label": null, "code": "LA6270-8", "text": "Never", "score": 5, "other": null}, {
          "label": null,
          "code": "LA10066-1",
          "text": "Rarely",
          "score": 4,
          "other": null
        }, {"label": null, "code": "LA10082-8", "text": "Sometimes", "score": 3, "other": null}, {
          "label": null,
          "code": "LA14747-2",
          "text": "Usually",
          "score": 2,
          "other": null
        }, {"label": null, "code": "LA9933-8", "text": "Always", "score": 1, "other": null}],
        "skipLogic": null,
        "restrictions": null,
        "defaultAnswer": null,
        "formatting": null,
        "calculationMethod": null,
        "items": null
      }
      // , {
      //   "questionCode": "77849-8",
      //   "localQuestionCode": null,
      //   "dataType": null,
      //   "header": false,
      //   "units": [{"name": "{Tscore}", "default": false, "normalRange": null, "absoluteRange": null}],
      //   "codingInstructions": null,
      //   "copyrightNotice": "Copyright © 2010 PROMIS Health Organization or other individuals/entities that have contributed information and materials to Assessment Center, and are being used with the permission of the copyright holders. Use of PROMIS instruments (e.g., item banks, short forms, profile measures) are subject to the PROMIS Terms and Conditions available at: http://www.assessmentcenter.net/TandC.aspx",
      //   "question": "PROMIS social isolation - version 2.0 T-score",
      //   "answers": null,
      //   "skipLogic": null,
      //   "restrictions": null,
      //   "defaultAnswer": null,
      //   "formatting": null,
      //   "calculationMethod": null,
      //   "items": null
      // }
      ]
    }

;

var questionInQuestion =
    {
      "type": "LOINC",
      "code": "question-in-question",
      "name": "A form that has a question contains a question or a section",
      "items": [
        {
          "questionCode": "q1",
          "dataType": "CNE",
          "question": "Containing Question #1",
          "answers": [
            {"code": "c1", "text": "Answer 1"},
            {"code": "c2", "text": "Answer 2"},
            {"code": "c3", "text": "Answer 3"},
            {"code": "c4", "text": "Answer 4"}],
          "items": [
            {
              "questionCode": "q11",
              "dataType": "ST",
              "question": "Contained question #11"
            },
            {
              "questionCode": "q12",
              "dataType": "ST",
              "question": "Contained question #12"
            }
          ]
        },
        {
          "questionCode": "q2",
          "dataType": "CNE",
          "question": "Containing Question #2",
          "answers": [
            {"code": "c1", "text": "Answer A"},
            {"code": "c2", "text": "Answer B"},
            {"code": "c3", "text": "Answer C"},
            {"code": "c4", "text": "Answer D"}],
          "items": [
            {
              "questionCode": "q21",
              "dataType": "ST",
              "question": "Contained question #21"
            },
            {
              "questionCode": "q22",
              "dataType": "SECTION",
              "header": true,
              "question": "Contained section #22",
              "items": [
                {
                  "questionCode": "q221",
                  "dataType": "ST",
                  "question": "Contained question #221"
                },
                {
                  "questionCode": "q222",
                  "dataType": "ST",
                  "question": "Contained question #222"
                }
              ]
            },
          ]

        },
        {
          "questionCode": "q3",
          "dataType": "CNE",
          "question": "Containing Question #3",
          "answers": [
            {"code": "c1", "text": "Answer A"},
            {"code": "c2", "text": "Answer B"},
            {"code": "c3", "text": "Answer C"},
            {"code": "c4", "text": "Answer D"}],
          "items": [
            {
              "questionCode": "q31",
              "dataType": "ST",
              "question": "Contained question #31",
              "questionCardinality": {"min": "1", "max": "*"}
            },
            {
              "questionCode": "q32",
              "dataType": "SECTION",
              "header": true,
              "question": "Contained section #32, repeating",
              "questionCardinality": {"min": "1", "max": "*"},
              "items": [
                {
                  "questionCode": "q321",
                  "dataType": "ST",
                  "question": "Contained question #321"
                },
                {
                  "questionCode": "q322",
                  "dataType": "ST",
                  "question": "Contained question #322"
                }
              ]
            },
          ]

        },
        {
          "questionCode": "q4",
          "dataType": "ST",
          "question": "A normal question"
        }
      ]
    };


var newGenetic = {
  "_comment": "WARNING:  Do not edit the generated copy of this file.",
  "type": "LOINC",
  "code": "81247-9",
  "name": "Master HL7 genetic variant reporting panel (2016-11-21)",
  "template": "table",
  "codingInstructions": "NIH/NLM/LHNCBC",
  "copyrightNotice": null,
  "items": [
    {
      "questionCode": "divider01",
      "question": "Form configuration",
      "dataType": "TITLE",
      "header": true
    },
    {"questionCode": "XXXXX-12",
      "question": "Choose kind of mutations targeted",
      "dataType": "CNE",
      "answerCardinality": {"max": "*", "min":"0"},
      "answers": [
        {"code": "C01", "text": "Discrete variants"},
        {"code": "C02", "text": "Complex variants"},
        {"code": "C04", "text": "Pharmacogenomics"}
      ],
      "defaultAnswer": [
        {"code": "C01", "text": "Discrete variants"},
        {"code": "C02", "text": "Complex variants"},
        {"code": "C04", "text": "Pharmacogenomics"}
      ]
    },
    {"questionCode": "XXXXX-10",
      "question": "Choose region of interest specification",
      "dataType": "CNE",
      "codingInstructions":"Not part of the HL7 specification. Used only to choose whether this is a targeted nutation analysis or a full sequencing analysis",
      "answerCardinality": {"max": "*", "min":"0"},
      "answers": [
        {"code": "C01", "text": "Specific targeted mutations"},
        {"code": "C02", "text": "Range targeted in the reference sequence"}
      ],
      "defaultAnswer": [
        {"code": "C01", "text": "Specific targeted mutations"},
        {"code": "C02", "text": "Range targeted in the reference sequence"}
      ]
    },
    {
      "questionCode": "81248-7",
      "question": "Default transcript reference sequence coding system",
      "dataType": "CWE",
      "answerCardinality": {
        "max": "1",
        "min": "0"
      },
      "answers": [
        {
          "code": "LA26214-9",
          "text": "NCBI NM"
        },
        {
          "code": "LA26358-4",
          "text": "Ensembl ENST"
        },
        {
          "code": "LA26216",
          "text": "LRG"
        },
        {
          "code": "LA2635-6",
          "text": "Other transcript reference sequence source"
        }
      ]
    },
    {
      "questionCode": "81249-5",
      "question": "Default genomic reference sequence coding system",
      "dataType": "CWE",
      "answerCardinality": {
        "max": "1",
        "min": "0"
      },
      "answers": [
        {
          "code": "C01",
          "text": "Ensembl genomic prefix =”ENSG”"
        },
        {
          "code": "C02",
          "text": "NCBI-NG-NC'"
        },
        {
          "code": "C04",
          "text": "Other G RefSeq coding system"
        }
      ]
    },
    {
      "questionCode": "81295-8",
      "question": "OID for other T RefSeq coding system",
      "dataType": "ST",
      "skipLogic": {"conditions":[{"source": "81248-7", "trigger": {"code": "LA2635-6"}}],
        "action": "show"}
    },
    {
      "questionCode": "81296-6",
      "question": "OID for other G RefSeq coding system",
      "dataType": "ST",
      "skipLogic": {"conditions":[{"source": "81249-5", "trigger": {"code": "C04"}}],
        "action": "show"}
    },


    {
      "questionCode": "81296-6",
      "question": "Variables that apply to the overall study",
      "dataType": "SECTION",
      "header": true,
      "items": [
        {"questionCode": "53577-3",
          "question": "Reason for study",
          "dataType": "TX"
        },
        {"questionCode":"51967-8",
          "question":"Genetic disease(s) assessed",
          "dataType":"CWE",
          "answerCodeSystem": "Medgen-Dis",
          "externallyDefined":"https://lforms-service.nlm.nih.gov/api/disease_names/v3/search?of=DiseaseName",

          "codingInstructions":"Choose diseases coded within MedGen or type in your own text name.",
          "answerCardinality": {"min":"0", "max":"*"}
        },
        {"questionCode": "51963-7",
          "question": "Medications assessed",
          "skipLogic": {"conditions":[{"source": "XXXXX-12", "trigger": {"code": "C04"}}],
            "action": "show"},
          "dataType": "CWE",
          "answerCardinality": {"min":"0", "max":"*"},
          "answerCodeSystem": "RxT-Ingrd",
          "externallyDefined":"https://lforms-service.nlm.nih.gov/api/drug_ingredients/v3/search"

        },
        {"questionCode": "48018-6",
          "question": "Gene(s) assessed",
          "dataType": "CNE",
          "answerCardinality": {"min":"0", "max":"*"},
          "answerCodeSystem": "HGNC-Symb",
          "displayControl": {
            "listColHeaders": ["Symbol", "HGNC&nbsp;ID", "Name", "Location"]
          },
          "externallyDefined":"https://lforms-service.nlm.nih.gov/api/genes/v3/search?df=symbol,hgnc_id,name_mod,location"

        },
        {"questionCode": "36908-2",
          "question": "Gene mutations tested",
          "skipLogic": {"conditions":[{"source": "XXXXX-10", "trigger": {"code": "C01"}}],
            "action": "show"},
          "dataType": "CWE",
          "answerCodeSystem": "CLINVAR-V",

          "externallyDefined": "https://lforms-service.nlm.nih.gov/api/variants/v3/search?df=Name,VariantID,phenotype.text&ef=AlleleID,RefSeqID,GeneSymbol,GenomicLocation,hgnc_id,NucleotideChange,AminoAcidChange,phenotype,AlternateAllele,ReferenceAllele,Cytogenetic,dbSNP,Name,Start,TypeAbbr,ChromosomeAccession&sf=AminoAcidChange,Cytogenetic,dbSNP,GeneID,GeneSymbol,HGVS_c,HGVS_p,Name,NucleotideChange,phenotypes.text,RefSeqID,Start,VariantID",
          "displayControl": {
            "listColHeaders": ["Name", "Variant&nbsp;ID", "Phenotype"]
          },

          "answerCardinality": {"min":"0", "max":"*"}
        },
        {"questionCode": "51959-5",
          "question": "Ranges of DNA sequences examined",
          "dataType": "NR",
          "questionCardinality": {"min":"0", "max":"*"},
          "skipLogic": {"conditions":[{"source": "XXXXX-10", "trigger": {"code": "C02"}}],
            "action": "show"}
        },
        {"questionCode": "81293-3",
          "question": "Description of ranges of DNA sequences examined",
          "dataType": "TX",
          "skipLogic": {"conditions":[{"source": "XXXXX-10", "trigger": {"code": "C02"}}],
            "action": "show"}
        },
        {
          "questionCode": "divider03t",
          "question": "Summary results",
          "dataType": "TITLE",
          "header": true
        },
        {"questionCode": "51968-6",
          "question": "Discrete variation analysis overall interpretation",
          "dataType": "CNE",
          "answers": [
            {"code": "LA6576-8", "text": "Positive"},
            {"code": "LA6577-6", "text": "Negative"},
            {"code": "LA9663-1", "text": "Inconclusive"},
            {"code": "LA9664-9", "text": "Failure"}
          ]
        },
        { "questionCode": "83006-7",
          "question": "Deletion-duplication overall interpretation",
          "dataType": "CWE",
          "answers": [
            {"code": "LA26803-9",
              "text": "No deletion or duplication detected in studied region"},
            {"code": "LA26804-7",
              "text": "Deletion and/or duplication detected in studied region"},
            {"code": "LA9663-1", "text": "Inconclusive"}
          ]
        },
        {"questionCode": "51969-4",
          "question": "Full narrative report",
          "dataType": "TX"
        },
        {"questionCode": "81291-7",
          "question": "Variant ISCN",
          "dataType": "ST"
        },
        {
          "questionCode": "divider04t",
          "question": "Versions of Coding Systems",
          "dataType": "TITLE",
          "header": true
        },
        {"questionCode": "62374-4",
          "question": "Human reference sequence assembly",
          "dataType": "CWE",
          "answers": [
            {"code": "LA14031-1", "text": "NCBI35"},
            {"code": "LA26805-4", "text": "NCBI36"},
            {"code": "LA14029-5", "text": "GRCh37"},
            {"code": "LA26806-2", "text": "GRCh38"}
          ]
        },
        {"questionCode": "81303-0",
          "question": "HGVS version [ID]",
          "dataType": "ST"
        },
        {"questionCode": "82115-7",
          "question": "dbSNP version [Num]",
          "dataType": "INT"
        },
        {"questionCode": "83007-5",
          "question": "COSMIC version [Num]",
          "dataType": "INT"
        },
        {"questionCode": "83008-3",
          "question": "ClinVar version [ID]",
          "dataType": "INT"
        }
      ]
    },


    { "questionCode": "81250-3",
      "question": "Discrete genetic variant panel",
      "questionCardinality": {"max": "*", "min":"0"},
      "skipLogic": {"conditions":[{"source": "XXXXX-12", "trigger": {"code": "C01"}}],
        "action": "show"},
      "header": true,
      "items" : [
        { "questionCode": "83005-9",
          "question": "Variant category",
          "dataType": "CNE",
          "answers": [
            { "code": "LA26801-3",
              "text": "Simple Variant",
              "dnaChangeTypeList": [
                { "text": "Wild Type", "code": "LA9658-1" },
                { "text": "Deletion", "code": "LA6692-3" },
                { "text": "Duplication", "code": "LA6686-5" },
                { "text": "Insertion", "code": "LA6687-3" },
                { "text": "Insertion/Deletion", "code": "LA6688-1" },
                { "text": "Inversion", "code": "LA6689-9" },
                { "text": "Substitution", "code": "LA6690-7" }
              ],
              "variantCodeSystemList": [
                {"text": "ClinVar Variants", "code": "CLINVAR-V",
                  "url": "https://lforms-service.nlm.nih.gov/api/variants/v3/search?df=Name,VariantID,phenotype.text&ef=AlleleID,RefSeqID,GeneSymbol,GenomicLocation,hgnc_id,NucleotideChange,AminoAcidChange,phenotype,AlternateAllele,ReferenceAllele,Cytogenetic,dbSNP,Name,Start,TypeAbbr,ChromosomeAccession&sf=AminoAcidChange,Cytogenetic,dbSNP,GeneID,GeneSymbol,HGVS_c,HGVS_p,Name,NucleotideChange,phenotypes.text,RefSeqID,Start,VariantID"},
                {"text": "ClinVar Alleles", "code": "CLINVAR-A",
                  "url": "https://lforms-service.nlm.nih.gov/api/alleles/v3/search?df=Name,AlleleID,phenotype.text&ef=AlleleID,RefSeqID,GeneSymbol,GenomicLocation,hgnc_id,NucleotideChange,AminoAcidChange,phenotype,AlternateAllele,ReferenceAllele,Cytogenetic,dbSNP,Name,Start,TypeAbbr,ChromosomeAccession&sf=AminoAcidChange,Cytogenetic,dbSNP,GeneID,GeneSymbol,HGVS_c,HGVS_p,Name,NucleotideChange,phenotypes.text,RefSeqID,Start,AlleleID"},
                {"text": "COSMIC", "code": "cosmic-Smpl",
                  "url": "https://lforms-service.nlm.nih.gov/api/cosmic/v3/search?ef=GeneName:GeneSymbol,MutationAA:NucleotideChange,MutationCDS:AminoAcidChange,MutationGenomePosition:Start&df=Name,MutationID,Site"},
                {"text": "Other variant source", "code": "LA46-8"}
              ]
            },
            {
              "code": "LA26802-1",
              "text": "Structural Variant",
              "dnaChangeTypeList": [
                {"text": "Copy number gain", "code": "LA14033-7"},
                {"text": "Copy number loss", "code": "LA14034-5"},
                {"text": "Duplication", "code": "LA6686-5"},
                {"text": "Deletion", "code": "LA6692-3"},
                {"text": "Insertion", "code": "LA6687-3"},
                {"code": "LA26324-6", "text": "Mobile element insertion"},
                {"code": "LA26325-3", "text": "Novel sequence insertion"},
                {"code": "LA26326-1", "text": "Tandem duplication"},
                {"code": "LA6689-9", "text": "Inversion"},
                {"code": "LA26327-9", "text": "Intrachromosomal breakpoint"},
                {"code": "LA26328-7", "text": "Interchromosomal breakpoint"},
                {"code": "LA26331-1", "text": "Translocation"},
                {"code": "LA26330-3", "text": "Complex"},
                {"code": "LA26329-5", "text": "Sequence alteration"}
              ],
              "variantCodeSystemList": [
                {"text": "COSMIC Structural", "code": "cosmic-Strct",
                  "url": "https://lforms-service.nlm.nih.gov/api/cosmic_struct/v3/search?sf=MutationID,MutationType,Site"},
                {"text": "Other variant source", "code": "LA46-8"}
              ]
            }
          ],
          "value": {
            "code": "LA26801-3",
            "text": "Simple Variant",
            "dnaChangeTypeList": [
              { "text": "Wild Type", "code": "LA9658-1" },
              { "text": "Deletion", "code": "LA6692-3" },
              { "text": "Duplication", "code": "LA6686-5" },
              { "text": "Insertion", "code": "LA6687-3" },
              { "text": "Insertion/Deletion", "code": "LA6688-1" },
              { "text": "Inversion", "code": "LA6689-9" },
              { "text": "Substitution", "code": "LA6690-7" }
            ],
            "variantCodeSystemList": [
              {"text": "ClinVar Variants", "code": "CLINVAR-V",
                "url": "https://lforms-service.nlm.nih.gov/api/variants/v3/search?df=Name,VariantID,phenotype.text&ef=AlleleID,RefSeqID,GeneSymbol,GenomicLocation,hgnc_id,NucleotideChange,AminoAcidChange,phenotype,AlternateAllele,ReferenceAllele,Cytogenetic,dbSNP,Name,Start,TypeAbbr,ChromosomeAccession&sf=AminoAcidChange,Cytogenetic,dbSNP,GeneID,GeneSymbol,HGVS_c,HGVS_p,Name,NucleotideChange,phenotypes.text,RefSeqID,Start,VariantID"},
              {"text": "ClinVar Alleles", "code": "CLINVAR-A",
                "url": "https://lforms-service.nlm.nih.gov/api/alleles/v3/search?df=Name,AlleleID,phenotype.text&ef=AlleleID,RefSeqID,GeneSymbol,GenomicLocation,hgnc_id,NucleotideChange,AminoAcidChange,phenotype,AlternateAllele,ReferenceAllele,Cytogenetic,dbSNP,Name,Start,TypeAbbr,ChromosomeAccession&sf=AminoAcidChange,Cytogenetic,dbSNP,GeneID,GeneSymbol,HGVS_c,HGVS_p,Name,NucleotideChange,phenotypes.text,RefSeqID,Start,AlleleID"},
              {"text": "COSMIC", "code": "cosmic-Smpl",
                "url": "https://lforms-service.nlm.nih.gov/api/cosmic/v3/search?ef=GeneName:GeneSymbol,MutationAA:NucleotideChange,MutationCDS:AminoAcidChange,MutationGenomePosition:Start&df=Name,MutationID,Site"},
              {"text": "Other variant source", "code": "LA46-8"}
            ]
          }
        },
        {
          "questionCode": "82122-3",
          "question": "Genetic variant coding system",
          "dataType": "CWE",
          "answerCardinality": {
            "max": "1",
            "min": "0"
          },
          "value": {"text": "ClinVar Variants",
            "code": "CLINVAR-V",
            "url": "https://lforms-service.nlm.nih.gov/api/variants/v3/search?df=Name,VariantID,phenotype.text&ef=AlleleID,RefSeqID,GeneSymbol,GenomicLocation,hgnc_id,NucleotideChange,AminoAcidChange,phenotype,AlternateAllele,ReferenceAllele,Cytogenetic,dbSNP,Name,Start,TypeAbbr,ChromosomeAccession&sf=AminoAcidChange,Cytogenetic,dbSNP,GeneID,GeneSymbol,HGVS_c,HGVS_p,Name,NucleotideChange,phenotypes.text,RefSeqID,Start,VariantID"
          },
          "answers": [
          ],
          "dataControl": [{
            "source": {
              "sourceType": "INTERNAL",
              "sourceItemCode": "83005-9"
            },
            "construction":"SIMPLE",
            "dataFormat": "value.variantCodeSystemList",
            "onAttribute":"answers"
          }]
        },
        { "questionCode": "81252-9",
          "question": "Discrete genetic variant",
          "dataType": "CWE",
          "answerCodeSystem": "CLINVAR-V",

          "externallyDefined": "https://lforms-service.nlm.nih.gov/api/variants/v3/search?df=Name,VariantID,phenotype.text&ef=AlleleID,RefSeqID,GeneSymbol,GenomicLocation,hgnc_id,NucleotideChange,AminoAcidChange,phenotype,AlternateAllele,ReferenceAllele,Cytogenetic,dbSNP,Name,Start,TypeAbbr,ChromosomeAccession&sf=AminoAcidChange,Cytogenetic,dbSNP,GeneID,GeneSymbol,HGVS_c,HGVS_p,Name,NucleotideChange,phenotypes.text,RefSeqID,Start,VariantID",
          "displayControl": {
            "listColHeaders": ["Name", "Variant&nbsp;ID", "Phenotype"]
          },

          "dataControl": [
            {
              "source": {
                "sourceType": "INTERNAL",
                "sourceItemCode": "82122-3"
              },
              "construction":"SIMPLE",
              "dataFormat":"value.url",
              "onAttribute": "externallyDefined"
            },
            {
              "source": {
                "sourceType": "INTERNAL",
                "sourceItemCode": "83005-9"
              },
              "construction":"SIMPLE",
              "dataFormat":"value.answerCodeSystem",
              "onAttribute": "answerCodeSystem"
            }
          ]
        },


        {
          "questionCode": "X0008-1",
          "question": "Transcript specification",
          "header": true,
          "dataType": "TITLE"
        },
        {
          "questionCode": "48018-6",
          "question": "Gene studied",
          "dataType": "CWE",
          "answerCardinality": {
            "max": "1",
            "min": "0"
          },
          "dataControl": [
            {
              "source": {
                "sourceType":"INTERNAL",
                "sourceItemCode":"81252-9"
              },
              "construction":"OBJECT",
              "dataFormat":{"code": "value.hgnc_id","text": "value.GeneSymbol"},
              "onAttribute":"value"
            }
          ],
          "answerCodeSystem": "HGNC-Symb",
          "displayControl": {
            "listColHeaders": ["Symbol", "HGNC&nbsp;ID", "Name", "Location"]
          },
          "externallyDefined":"https://lforms-service.nlm.nih.gov/api/genes/v3/search?df=symbol,hgnc_id,name_mod,location"

        },
        {
          "questionCode": "51958-7",
          "question": "Transcript RefSeq ID",
          "dataType": "CWE",
          "answerCodeSystem": "RefSeq-T",
          "externallyDefined":"https://lforms-service.nlm.nih.gov/api/refseqs/v3/search",
          "dataControl": [
            {
              "source": {
                "sourceType":"INTERNAL",
                "sourceItemCode":"81252-9"
              },
              "construction":"OBJECT",
              "dataFormat":{"code": "value.RefSeqID", "text": "value.RefSeqID"},
              "onAttribute":"value"
            }
          ]
        },
        {
          "questionCode": "41103-3",
          "question": "DNA change c.HGVS",
          "dataType": "CWE",
          "answerCodeSystem": "HGVS.c",
          "externallyDefined": "https://lforms-service.nlm.nih.gov/api/variants/v3/search?cf=NucleotideChange&df=NucleotideChange,GeneSymbol",
          "dataControl": [
            {
              "source": {
                "sourceType":"INTERNAL",
                "sourceItemCode":"81252-9"
              },
              "construction":"OBJECT",
              "dataFormat":{"code": "value.NucleotideChange", "text": "value.NucleotideChange"},
              "onAttribute":"value"
            }
          ]
        },
        {
          "questionCode": "48005-3",
          "question": "Amino acid change p.HGVS",
          "dataType": "CWE",
          "answerCodeSystem": "HGVS.p",
          "externallyDefined": "https://lforms-service.nlm.nih.gov/api/variants/v3/search?cf=AminoAcidChange&df=AminoAcidChange,GeneSymbol",
          "dataControl": [
            {
              "source": {
                "sourceType":"INTERNAL",
                "sourceItemCode":"81252-9"
              },
              "construction":"OBJECT",
              "dataFormat":{"code": "value.AminoAcidChange", "text": "value.AminoAcidChange"},
              "onAttribute":"value"
            }
          ]
        },
        {
          "questionCode": "48019-4",
          "question": "DNA change type",
          "dataType": "CWE",
          "answerCardinality": {
            "max": "1",
            "min": "0"
          },
          "answers": [
            { "text": "Wild Type", "code": "LA9658-1" },
            { "text": "Deletion", "code": "LA6692-3" },
            { "text": "Duplication", "code": "LA6686-5" },
            { "text": "Insertion", "code": "LA6687-3" },
            { "text": "Insertion/Deletion", "code": "LA6688-1" },
            { "text": "Inversion", "code": "LA6689-9" },
            { "text": "Substitution", "code": "LA6690-7" },
            {"text": "Copy number gain", "code": "LA14033-7"},
            {"text": "Copy number loss", "code": "LA14034-5"},
            {"code": "LA26324-6", "text": "Mobile element insertion"},
            {"code": "LA26325-3", "text": "Novel sequence insertion"},
            {"code": "LA26326-1", "text": "Tandem duplication"},
            {"code": "LA26327-9", "text": "Intrachromosomal breakpoint"},
            {"code": "LA26328-7", "text": "Interchromosomal breakpoint"},
            {"code": "LA26331-1", "text": "Translocation"},
            {"code": "LA26330-3", "text": "Complex"},
            {"code": "LA26329-5", "text": "Sequence alteration"}
          ],
          "dataControl": [
            {
              "source": {
                "sourceType":"INTERNAL",
                "sourceItemCode":"81252-9"
              },
              "construction":"OBJECT",
              "dataFormat":{"code": "value.TypeAbbr", "text": "value.TypeAbbr"},
              "onAttribute":"value"
            },
            { "source" : {
              "sourceType":"INTERNAL",
              "sourceItemCode":"83005-9"
            },
              "construction":"SIMPLE",
              "dataFormat": "value.dnaChangeTypeList",
              "onAttribute":"answers"
            }
          ]
        },
        {
          "questionCode": "48006-1",
          "question": "Amino acid change type",
          "dataType": "CWE",
          "answerCardinality": {
            "max": "1",
            "min": "0"
          },
          "answers": [{
            "text": "Wild type",
            "code": "LA9658-1"
          }, {
            "text": "Deletion",
            "code": "LA6692-3"
          }, {
            "text": "Duplication",
            "code": "LA6686-5"
          }, {
            "text": "Frameshift",
            "code": "LA6694-9"
          }, {
            "text": "Initiating Methionine",
            "code": "LA6695-6"
          }, {
            "text": "Insertion",
            "code": "LA6687-3"
          }, {
            "text": "Insertion and Deletion",
            "code": "LA9659-9"
          }, {
            "text": "Missense",
            "code": "LA6698-0"
          }, {
            "text": "Nonsense",
            "code": "LA6699-8"
          }, {
            "text": "Silent",
            "code": "LA6700-4"
          }, {
            "text": "Stop Codon Mutation",
            "code": "LA6701-2"
          }]
        }
        ,
        {
          "questionCode": "X0009-1",
          "question": "Genomic specification",
          "header": true,
          "dataType": "TITLE"
        },
        {"questionCode": "48013-7",
          "question": "Genomic reference sequence",
          "dataType": "CWE",
          "answerCodeSystem": "RefSeq-G",
          "externallyDefined":"https://lforms-service.nlm.nih.gov/api/refseqs/v3/search?q=!RefSeq%3ANM*&sf=RefSeq&df=RefSeq",
          "dataControl": [
            {
              "source": {
                "sourceType":"INTERNAL",
                "sourceItemCode":"81252-9"
              },
              "construction":"OBJECT",
              "dataFormat":{"text": "value.ChromosomeAccession","code": "value.ChromosomeAccession"},
              "onAttribute":"value"
            }
          ]
        },
        { "questionCode": "81290-9",
          "question": "Genomic DNA change (gHGVS)",
          "dataType": "ST"
        },
        {"questionCode": "69547-8",
          "question": "Genomic ref allele",
          "dataControl": [
            {
              "source": {
                "sourceType":"INTERNAL",
                "sourceItemCode":"81252-9"
              },
              "construction":"SIMPLE",
              "dataFormat":"value.ReferenceAllele",
              "onAttribute":"value"
            }
          ]
        },
        {"questionCode": "81254-5",
          "question": "Genomic allele start-end",
          "dataType": "NR",
          "dataControl": [
            {
              "source": {
                "sourceType":"INTERNAL",
                "sourceItemCode":"81252-9"
              },
              "construction":"SIMPLE",
              "dataFormat":"value.GenomicLocation",
              "onAttribute":"value"
            }
          ]
        },
        {"questionCode": "69551-0",
          "question": "Genomic alt allele",
          "dataControl": [
            {
              "source": {
                "sourceType":"INTERNAL",
                "sourceItemCode":"81252-9"
              },
              "construction":"SIMPLE",
              "dataFormat":"value.AlternateAllele",
              "onAttribute":"value"
            }
          ]
        }
        ,
        {
          "questionCode": "X0010-1",
          "question": "Other optional codes related to a discrete genetic variant",
          "header": true,
          "dataType": "TITLE"
        },
        { "questionCode": "48008-7",
          "question": "Haplotype Name",
          "dataType": "ST"
        },
        {"questionCode": "81255-2",
          "question": "dbSNP ID",
          "dataType": "CNE",
          "answerCardinality": {"max": "1", "min":"0"},
          "answerCodeSystem": "dbSNP",
          "externallyDefined":
              "https://lforms-service.nlm.nih.gov/api/snps/v3/search?df=rsNum,chr,chrPos,alleles,geneSymbol",
          "displayControl": {
            "listColHeaders": ["ID", "Chromosome", "Chr.&nbsp;Position",
              "Alleles", "Gene"]
          },
          "dataControl": [
            {
              "source": {
                "sourceType":"INTERNAL",
                "sourceItemCode":"81252-9"
              },
              "construction":"OBJECT",
              "dataFormat":{"text": "value.dbSNP", "code": "value.code"},
              "onAttribute":"value"
            }
          ]
        },
        {"questionCode": "81257-8",
          "question": "CIGAR",
          "dataType": "ST"
        }
        ,
        {
          "questionCode": "X0011-1",
          "question": "Other possible attributes",
          "header": true,
          "dataType": "TITLE"
        },
        {"questionCode": "48001-2",
          "question": "Cytogenetic location of variant",
          "dataType": "CWE",
          "answerCodeSystem": "Chrom-Loc",
          "externallyDefined":"https://lforms-service.nlm.nih.gov/api/cytogenetic_locs/v3/search",

          "dataControl": [
            {
              "source": {
                "sourceType":"INTERNAL",
                "sourceItemCode":"81252-9"
              },
              "construction":"OBJECT",
              "dataFormat":{"text": "value.Cytogenetic", "code": "value.Cytogenetic"},
              "onAttribute":"value"
            }
          ]
        },
        {"questionCode": "48002-0",
          "question": "Genomic source class",
          "dataType": "CNE",
          "answerCardinality": {"max": "1", "min":"0"},
          "answers": [
            {"code": "LA6683-2", "text": "Germline"},
            {"code": "LA6684-0", "text": "Somatic"},
            {"code": "LA10429-1", "text": "Prenatal"},
            {"code": "LA18194-3", "text": "Likely germline"},
            {"code": "LA18195-0", "text": "Likely somatic"},
            {"code": "LA18196-8", "text": "Likely prenatal"},
            {"code": "LA18197-6", "text": "Unknown genomic origin"}
          ]
        },
        {
          "questionCode": "81304-8",
          "question": "Variant analysis method type",
          "dataType": "CWE",
          "answerCardinality": {"min":"0", "max": "1"},
          "answers": [
            {"code": "LA26398-0", "text": "Sequencing"},
            {"code": "LA26399-8", "text": "Oligo aCGH"},
            {"code": "LA26400-4", "text": "SNP Array"},
            {"code": "LA26401-2", "text": "BAC aCGH"},
            {"code": "LA26402-0", "text": "Curated"},
            {"code": "LA26403-8", "text": "Digital Array"},
            {"code": "LA26404-6", "text": "FISH"},
            {"code": "LA26405-3", "text": "Gene Expression Array"},
            {"code": "LA26406-1", "text": "Karyotyping"},
            {"code": "LA26407-9", "text": "MAPH"},
            {"code": "LA26408-7", "text": "MassSpec"},
            {"code": "LA26808-8", "text": "Merging"},
            {"code": "LA26414-5", "text": "Multiple Complete Digestion"},
            {"code": "LA26415-2", "text": "MLPA"},
            {"code": "LA26417-8", "text": "Optical Mapping"},
            {"code": "LA26418-6", "text": "PCR"},
            {"code": "LA26419-4", "text": "qPCR (Real-time PCR)"},
            {"code": "LA26420-2", "text": "ROMA"},
            {"code": "LA26809-6", "text": "Denaturing high pressure liquid chromatography (DHPLC)"},
            {"code": "LA26810-4", "text": "DNA hybridization"},
            {"code": "LA26811-2", "text": "Computational analysis"},
            {"code": "LA26812-0", "text": "Single-stranded conformational polymorphism (SSCP)"},
            {"code": "LA26813-8", "text": "Restriction Fragment Length Polymorphism (RFLP)"}
          ]
        }

        ,
        {
          "questionCode": "X0012-1",
          "question": "Interpretations",
          "header": true,
          "dataType": "TITLE"
        },
        {"questionCode": "53037-8",
          "question": "Clinical significance",
          "dataType": "CNE",
          "answerCardinality": {"max": "1", "min":"0"},
          "answers": [{
            "code": "LA6668-3",
            "text": "Pathogenic"
          }, {
            "code": "LA6669-1",
            "text": "Likely Pathogenic"
          }, {
            "code": "LA6671-7",
            "text": "Uncertain Significance"
          }, {
            "code": "LA6674-1",
            "text": "Likely Benign"
          }, {
            "code": "LA6675-8",
            "text": "Benign"
          }]
        },
        {"questionCode": "69548-6",
          "question": "Genomic variant assessment",
          "dataType": "CNE",
          "answerCardinality": {"max": "1", "min":"0"},
          "answers": [
            {"code": "LA9633-4", "text": "Present"},
            {"code": "LA9634-2", "text": "Absent"},
            {"code": "LA18198-4", "text": "No call"},
            {"code": "LA11884-6", "text": "Indeterminate"}
          ]
        },
        {"questionCode": "81259-4",
          "question": "Probable associated phenotype",
          "dataType": "CWE",
          "answerCardinality": {"max": "1", "min":"0"},
          "answerCodeSystem": "Medgen-Dis",
          "externallyDefined":"https://lforms-service.nlm.nih.gov/api/disease_names/v3/search?of=DiseaseName",

          "dataControl": [
            {
              "source": {
                "sourceType":"INTERNAL",
                "sourceItemCode":"81252-9"
              },
              "construction":"SIMPLE",
              "dataFormat":"value.phenotype",
              "onAttribute":"value"
            }
          ]
        }

        ,
        {
          "questionCode": "X0013-1",
          "question": "Allelic state/phase information",
          "header": true,
          "dataType": "TITLE"
        },
        {
          "questionCode":"53034-5",
          "localQuestionCode":null,
          "dataType":"CNE",
          "header":false,
          "units":null,
          "codingInstructions":"The level of occurrence of a single DNA Marker within a set of chromosomes. Heterozygous indicates the DNA Marker is only present in one of the two genes contained in homologous chromosomes. Homozygous indicates the DNA Marker is present in both genes contained in homologous chromosomes. Hemizygous indicates the DNA Marker exists in the only single copy of a gene in a non-homologous chromosome (The male X and Y chromosome are non-homologous). Hemiplasmic indicates that the DNA Marker is present in some but not all of the copies of mitochondrial DNA. Homoplasmic indicates that the DNA Maker is present in all of the copies of mitochondrial DNA.\r\n",
          "copyrightNotice":null,
          "questionCardinality":null,
          "answerCardinality":{
            "min":"0",
            "max":"1"
          },
          "question":"Allelic state",
          "answers":[
            {
              "label":null,
              "code":"LA6703-8",
              "text":"Heteroplasmic",
              "score":null,
              "other":null
            },
            {
              "label":null,
              "code":"LA6704-6",
              "text":"Homoplasmic",
              "score":null,
              "other":null
            },
            {
              "label":null,
              "code":"LA6705-3",
              "text":"Homozygous",
              "score":null,
              "other":null
            },
            {
              "label":null,
              "code":"LA6706-1",
              "text":"Heterozygous",
              "score":null,
              "other":null
            },
            {
              "label":null,
              "code":"LA6707-9",
              "text":"Hemizygous",
              "score":null,
              "other":null
            }
          ]
        },
        {"questionCode": "81258-6",
          "question": "Allelic Frequency NFR",
          "dataType": "REAL"
        },
        {"questionCode": "82121-5",
          "question": "Allelic read depth",
          "dataType": "REAL"
        },
        {"questionCode": "82120-7",
          "question": "Allelic phase [Type]",
          "dataType": "CWE",
          "answers": [
            {"code": "LA6112-2", "text": "1"},
            {"code": "LA6113-0", "text": "2"},
            {"code": "LA6114-8", "text": "3"},
            {"code": "LA26320-4", "text": "Maternal"},
            {"code": "LA26321-2", "text": "Paternal"},
            {"code": "LA4489-6", "text": "Unknown"},
            {"code": "LA46-8", "text": "Other"}
          ]
        },
        {
          "questionCode": "82309-6",
          "question": "Basis for allelic phase",
          "dataType": "CNE",
          "answers": [{
            "code": "X1",
            "text": "Directly measured"
          }, {
            "code": "X2",
            "text": "Family DNA"
          }, {
            "code": "X3",
            "text": "Family history"
          }, {
            "code": "X4",
            "text": "Inferred from population data"
          }]
        }

        ,
        { "questionCode": "81297-4",
          "question": "Structural variant addendum panel",
          "skipLogic": {"conditions":[{"source": "83005-9", "trigger": {
            "code": "LA26802-1"}}], "action": "show"},
          "header": true,
          "items" : [
            {"questionCode": "82155-3",
              "question": "Copy number",
              "dataType": "INT"
            },
            {"questionCode": "81299-0",
              "question": "arrCGH ratio",
              "dataType": "REAL",
              "answerCardinality": {"max": "1", "min":"0"}
            },
            {"questionCode": "81300-6",
              "question": "Structural variant length",
              "dataType": "INT"
            },
            {"questionCode": "81301-4",
              "question": "Structural variant outer start-end",
              "dataType": "NR"
            },
            {"questionCode": "81302-2",
              "question": "Structural variant inner start-end",
              "dataType": "NR"
            }


          ]
        }

      ]
    },
    {"questionCode": "81251-1",
      "question": "Complex genetic variant - panel",
      "skipLogic": {"conditions":[{"source": "XXXXX-12", "trigger": {"code": "C02"}}],
        "action": "show"},
      "questionCardinality": {"max": "*", "min":"0"},
      "header": true,
      "items" : [
        {"questionCode": "81260-2",
          "question": "Complex variant ID",
          "dataType": "CWE",
          "answerCardinality": {"max": "1", "min":"0"},
          "answerCodeSystem": "CLINVAR-V",

          "externallyDefined":"https://lforms-service.nlm.nih.gov/api/variants/v3/search?df=VariantID,RefSeqID,GeneSymbol,NucleotideChange,AminoAcidChange,phenotype.text&ef=AlleleID,RefSeqID,GeneSymbol,NucleotideChange,AminoAcidChange,phenotype,AlternateAllele,ReferenceAllele,Cytogenetic,dbSNP,Name,Start,TypeAbbr,ChromosomeAccession,HGVS_c&sf=AminoAcidChange,Cytogenetic,dbSNP,GeneID,GeneSymbol,HGVS_c,HGVS_p,Name,NucleotideChange,phenotypes.text,RefSeqID,Start,VariantID"
        },
        {
          "questionCode": "81262-8",
          "question": "Complex variant HGVS name",
          "dataType": "ST",
          "answerCardinality": {
            "max": "1",
            "min": "0"
          },
          "dataControl": [
            {
              "source": {
                "sourceType":"INTERNAL",
                "sourceItemCode":"81260-2"
              },
              "construction":"SIMPLE",
              "dataFormat":"value.HGVS_c",
              "onAttribute":"value"
            }
          ]
        },
        {"questionCode": "81263-6",
          "question": "Complex variant type",
          "dataType": "CNE",
          "answers": [
            {"code": "LA26217-2", "text": "Compound heterozygous"},
            {"code": "LA26220-6", "text": "Double heterozygous"},
            {"code": "LA26218-0", "text": "Haplotype"},
            {"code": "LA6707-9", "text": "Hemizygous"}
          ]
        },
        {"questionCode": "81259-4",
          "question": "Associated phenotype",
          "dataType": "CWE",
          "answerCardinality": {"max": "1", "min":"0"},
          "answerCodeSystem": "Medgen-Dis",
          "externallyDefined":"https://lforms-service.nlm.nih.gov/api/disease_names/v3/search?of=DiseaseName",

          "dataControl": [
            {
              "source": {
                "sourceType":"INTERNAL",
                "sourceItemCode":"81260-2"
              },
              "construction":"SIMPLE",
              "dataFormat":"value.phenotype",
              "onAttribute":"value"
            }
          ]
        },
        {"questionCode": "53037-8",
          "question": "Clinical significance",
          "dataType": "CNE",
          "answerCardinality": {"max": "1", "min":"0"},
          "answers": [{
            "code": "LA6668-3",
            "text": "Pathogenic"
          }, {
            "code": "LA6669-1",
            "text": "Likely Pathogenic"
          }, {
            "code": "LA6671-7",
            "text": "Uncertain Significance"
          }, {
            "code": "LA6674-1",
            "text": "Likely Benign"
          }, {
            "code": "LA6675-8",
            "text": "Benign"
          }]
        },
        {
          "questionCode":"53034-5",
          "localQuestionCode":null,
          "dataType":"CNE",
          "header":false,
          "units":null,
          "codingInstructions":"The level of occurrence of a single DNA Marker within a set of chromosomes. Heterozygous indicates the DNA Marker is only present in one of the two genes contained in homologous chromosomes. Homozygous indicates the DNA Marker is present in both genes contained in homologous chromosomes. Hemizygous indicates the DNA Marker exists in the only single copy of a gene in a non-homologous chromosome (The male X and Y chromosome are non-homologous). Hemiplasmic indicates that the DNA Marker is present in some but not all of the copies of mitochondrial DNA. Homoplasmic indicates that the DNA Maker is present in all of the copies of mitochondrial DNA.\r\n",
          "copyrightNotice":null,
          "questionCardinality":null,
          "answerCardinality":{
            "min":"0",
            "max":"1"
          },
          "question":"Allelic state",
          "answers":[
            {
              "label":null,
              "code":"LA6703-8",
              "text":"Heteroplasmic",
              "score":null,
              "other":null
            },
            {
              "label":null,
              "code":"LA6704-6",
              "text":"Homoplasmic",
              "score":null,
              "other":null
            },
            {
              "label":null,
              "code":"LA6705-3",
              "text":"Homozygous",
              "score":null,
              "other":null
            },
            {
              "label":null,
              "code":"LA6706-1",
              "text":"Heterozygous",
              "score":null,
              "other":null
            },
            {
              "label":null,
              "code":"LA6707-9",
              "text":"Hemizygous",
              "score":null,
              "other":null
            }
          ]
        },
        {
          "questionCode": "82309-6",
          "question": "Basis for allelic phase",
          "dataType": "CNE",
          "answers": [{
            "code": "X1",
            "text": "Directly measured"
          }, {
            "code": "X2",
            "text": "Family DNA"
          }, {
            "code": "X3",
            "text": "Family history"
          }, {
            "code": "X4",
            "text": "Inferred from population data"
          }]
        },


        {
          "questionCode": "81250-3",
          "question": "Discrete genetic variant panel",
          "questionCardinality": {
            "max": "*",
            "min": "1"
          },
          "header": true,
          "layout": "vertical",
          "items": [
            { "questionCode": "83005-9",
              "question": "Variant category",
              "dataType": "CNE",
              "answers": [
                { "code": "LA26801-3",
                  "text": "Simple Variant",
                  "dnaChangeTypeList": [
                    { "text": "Wild Type", "code": "LA9658-1" },
                    { "text": "Deletion", "code": "LA6692-3" },
                    { "text": "Duplication", "code": "LA6686-5" },
                    { "text": "Insertion", "code": "LA6687-3" },
                    { "text": "Insertion/Deletion", "code": "LA6688-1" },
                    { "text": "Inversion", "code": "LA6689-9" },
                    { "text": "Substitution", "code": "LA6690-7" }
                  ],
                  "variantCodeSystemList": [
                    {"text": "ClinVar Variants", "code": "CLINVAR-V",
                      "url": "https://lforms-service.nlm.nih.gov/api/variants/v3/search?df=Name,VariantID,phenotype.text&ef=AlleleID,RefSeqID,GeneSymbol,GenomicLocation,hgnc_id,NucleotideChange,AminoAcidChange,phenotype,AlternateAllele,ReferenceAllele,Cytogenetic,dbSNP,Name,Start,TypeAbbr,ChromosomeAccession&sf=AminoAcidChange,Cytogenetic,dbSNP,GeneID,GeneSymbol,HGVS_c,HGVS_p,Name,NucleotideChange,phenotypes.text,RefSeqID,Start,VariantID"},
                    {"text": "ClinVar Alleles", "code": "CLINVAR-A",
                      "url": "https://lforms-service.nlm.nih.gov/api/alleles/v3/search?df=Name,AlleleID,phenotype.text&ef=AlleleID,RefSeqID,GeneSymbol,GenomicLocation,hgnc_id,NucleotideChange,AminoAcidChange,phenotype,AlternateAllele,ReferenceAllele,Cytogenetic,dbSNP,Name,Start,TypeAbbr,ChromosomeAccession&sf=AminoAcidChange,Cytogenetic,dbSNP,GeneID,GeneSymbol,HGVS_c,HGVS_p,Name,NucleotideChange,phenotypes.text,RefSeqID,Start,AlleleID"},
                    {"text": "COSMIC", "code": "cosmic-Smpl",
                      "url": "https://lforms-service.nlm.nih.gov/api/cosmic/v3/search?ef=GeneName:GeneSymbol,MutationAA:NucleotideChange,MutationCDS:AminoAcidChange,MutationGenomePosition:Start&df=Name,MutationID,Site"},
                    {"text": "Other variant source", "code": "LA46-8"}
                  ]
                },
                {
                  "code": "LA26802-1",
                  "text": "Structural Variant",
                  "dnaChangeTypeList": [
                    {"text": "Copy number gain", "code": "LA14033-7"},
                    {"text": "Copy number loss", "code": "LA14034-5"},
                    {"text": "Duplication", "code": "LA6686-5"},
                    {"text": "Deletion", "code": "LA6692-3"},
                    {"text": "Insertion", "code": "LA6687-3"},
                    {"code": "LA26324-6", "text": "Mobile element insertion"},
                    {"code": "LA26325-3", "text": "Novel sequence insertion"},
                    {"code": "LA26326-1", "text": "Tandem duplication"},
                    {"code": "LA6689-9", "text": "Inversion"},
                    {"code": "LA26327-9", "text": "Intrachromosomal breakpoint"},
                    {"code": "LA26328-7", "text": "Interchromosomal breakpoint"},
                    {"code": "LA26331-1", "text": "Translocation"},
                    {"code": "LA26330-3", "text": "Complex"},
                    {"code": "LA26329-5", "text": "Sequence alteration"}
                  ],
                  "variantCodeSystemList": [
                    {"text": "COSMIC Structural", "code": "cosmic-Strct",
                      "url": "https://lforms-service.nlm.nih.gov/api/cosmic_struct/v3/search?sf=MutationID,MutationType,Site"},
                    {"text": "Other variant source", "code": "LA46-8"}
                  ]
                }
              ],
              "value": {
                "code": "LA26801-3",
                "text": "Simple Variant",
                "dnaChangeTypeList": [
                  { "text": "Wild Type", "code": "LA9658-1" },
                  { "text": "Deletion", "code": "LA6692-3" },
                  { "text": "Duplication", "code": "LA6686-5" },
                  { "text": "Insertion", "code": "LA6687-3" },
                  { "text": "Insertion/Deletion", "code": "LA6688-1" },
                  { "text": "Inversion", "code": "LA6689-9" },
                  { "text": "Substitution", "code": "LA6690-7" }
                ],
                "variantCodeSystemList": [
                  {"text": "ClinVar Variants", "code": "CLINVAR-V",
                    "url": "https://lforms-service.nlm.nih.gov/api/variants/v3/search?df=Name,VariantID,phenotype.text&ef=AlleleID,RefSeqID,GeneSymbol,GenomicLocation,hgnc_id,NucleotideChange,AminoAcidChange,phenotype,AlternateAllele,ReferenceAllele,Cytogenetic,dbSNP,Name,Start,TypeAbbr,ChromosomeAccession&sf=AminoAcidChange,Cytogenetic,dbSNP,GeneID,GeneSymbol,HGVS_c,HGVS_p,Name,NucleotideChange,phenotypes.text,RefSeqID,Start,VariantID"},
                  {"text": "ClinVar Alleles", "code": "CLINVAR-A",
                    "url": "https://lforms-service.nlm.nih.gov/api/alleles/v3/search?df=Name,AlleleID,phenotype.text&ef=AlleleID,RefSeqID,GeneSymbol,GenomicLocation,hgnc_id,NucleotideChange,AminoAcidChange,phenotype,AlternateAllele,ReferenceAllele,Cytogenetic,dbSNP,Name,Start,TypeAbbr,ChromosomeAccession&sf=AminoAcidChange,Cytogenetic,dbSNP,GeneID,GeneSymbol,HGVS_c,HGVS_p,Name,NucleotideChange,phenotypes.text,RefSeqID,Start,AlleleID"},
                  {"text": "COSMIC", "code": "cosmic-Smpl",
                    "url": "https://lforms-service.nlm.nih.gov/api/cosmic/v3/search?ef=GeneName:GeneSymbol,MutationAA:NucleotideChange,MutationCDS:AminoAcidChange,MutationGenomePosition:Start&df=Name,MutationID,Site"},
                  {"text": "Other variant source", "code": "LA46-8"}
                ]
              }
            },
            {
              "questionCode": "82122-3",
              "question": "Genetic variant coding system",
              "dataType": "CWE",
              "answerCardinality": {
                "max": "1",
                "min": "0"
              },
              "value": {"text": "ClinVar Variants",
                "code": "CLINVAR-V",
                "url": "https://lforms-service.nlm.nih.gov/api/variants/v3/search?df=Name,VariantID,phenotype.text&ef=AlleleID,RefSeqID,GeneSymbol,GenomicLocation,hgnc_id,NucleotideChange,AminoAcidChange,phenotype,AlternateAllele,ReferenceAllele,Cytogenetic,dbSNP,Name,Start,TypeAbbr,ChromosomeAccession&sf=AminoAcidChange,Cytogenetic,dbSNP,GeneID,GeneSymbol,HGVS_c,HGVS_p,Name,NucleotideChange,phenotypes.text,RefSeqID,Start,VariantID"
              },
              "answers": [
              ],
              "dataControl": [{
                "source": {
                  "sourceType": "INTERNAL",
                  "sourceItemCode": "83005-9"
                },
                "construction":"SIMPLE",
                "dataFormat": "value.variantCodeSystemList",
                "onAttribute":"answers"
              }]
            },
            { "questionCode": "81252-9",
              "question": "Discrete genetic variant",
              "dataType": "CWE",
              "answerCodeSystem": "CLINVAR-V",

              "externallyDefined": "https://lforms-service.nlm.nih.gov/api/variants/v3/search?df=Name,VariantID,phenotype.text&ef=AlleleID,RefSeqID,GeneSymbol,GenomicLocation,hgnc_id,NucleotideChange,AminoAcidChange,phenotype,AlternateAllele,ReferenceAllele,Cytogenetic,dbSNP,Name,Start,TypeAbbr,ChromosomeAccession&sf=AminoAcidChange,Cytogenetic,dbSNP,GeneID,GeneSymbol,HGVS_c,HGVS_p,Name,NucleotideChange,phenotypes.text,RefSeqID,Start,VariantID",
              "displayControl": {
                "listColHeaders": ["Name", "Variant&nbsp;ID", "Phenotype"]
              },

              "dataControl": [
                {
                  "source": {
                    "sourceType": "INTERNAL",
                    "sourceItemCode": "82122-3"
                  },
                  "construction":"SIMPLE",
                  "dataFormat":"value.url",
                  "onAttribute": "externallyDefined"
                },
                {
                  "source": {
                    "sourceType": "INTERNAL",
                    "sourceItemCode": "83005-9"
                  },
                  "construction":"SIMPLE",
                  "dataFormat":"value.answerCodeSystem",
                  "onAttribute": "answerCodeSystem"
                }
              ]
            },


            {
              "questionCode": "X0008-1",
              "question": "Transcript specification",
              "header": true,
              "dataType": "TITLE"
            },
            {
              "questionCode": "48018-6",
              "question": "Gene studied",
              "dataType": "CWE",
              "answerCardinality": {
                "max": "1",
                "min": "0"
              },
              "dataControl": [
                {
                  "source": {
                    "sourceType":"INTERNAL",
                    "sourceItemCode":"81252-9"
                  },
                  "construction":"OBJECT",
                  "dataFormat":{"code": "value.hgnc_id","text": "value.GeneSymbol"},
                  "onAttribute":"value"
                }
              ],
              "answerCodeSystem": "HGNC-Symb",
              "displayControl": {
                "listColHeaders": ["Symbol", "HGNC&nbsp;ID", "Name", "Location"]
              },
              "externallyDefined":"https://lforms-service.nlm.nih.gov/api/genes/v3/search?df=symbol,hgnc_id,name_mod,location"

            },
            {
              "questionCode": "51958-7",
              "question": "Transcript RefSeq ID",
              "dataType": "CWE",
              "answerCodeSystem": "RefSeq-T",
              "externallyDefined":"https://lforms-service.nlm.nih.gov/api/refseqs/v3/search",
              "dataControl": [
                {
                  "source": {
                    "sourceType":"INTERNAL",
                    "sourceItemCode":"81252-9"
                  },
                  "construction":"OBJECT",
                  "dataFormat":{"code": "value.RefSeqID", "text": "value.RefSeqID"},
                  "onAttribute":"value"
                }
              ]
            },
            {
              "questionCode": "41103-3",
              "question": "DNA change c.HGVS",
              "dataType": "CWE",
              "answerCodeSystem": "HGVS.c",
              "externallyDefined": "https://lforms-service.nlm.nih.gov/api/variants/v3/search?cf=NucleotideChange&df=NucleotideChange,GeneSymbol",
              "dataControl": [
                {
                  "source": {
                    "sourceType":"INTERNAL",
                    "sourceItemCode":"81252-9"
                  },
                  "construction":"OBJECT",
                  "dataFormat":{"code": "value.NucleotideChange", "text": "value.NucleotideChange"},
                  "onAttribute":"value"
                }
              ]
            },
            {
              "questionCode": "48005-3",
              "question": "Amino acid change p.HGVS",
              "dataType": "CWE",
              "answerCodeSystem": "HGVS.p",
              "externallyDefined": "https://lforms-service.nlm.nih.gov/api/variants/v3/search?cf=AminoAcidChange&df=AminoAcidChange,GeneSymbol",
              "dataControl": [
                {
                  "source": {
                    "sourceType":"INTERNAL",
                    "sourceItemCode":"81252-9"
                  },
                  "construction":"OBJECT",
                  "dataFormat":{"code": "value.AminoAcidChange", "text": "value.AminoAcidChange"},
                  "onAttribute":"value"
                }
              ]
            },
            {
              "questionCode": "48019-4",
              "question": "DNA change type",
              "dataType": "CWE",
              "answerCardinality": {
                "max": "1",
                "min": "0"
              },
              "answers": [
                { "text": "Wild Type", "code": "LA9658-1" },
                { "text": "Deletion", "code": "LA6692-3" },
                { "text": "Duplication", "code": "LA6686-5" },
                { "text": "Insertion", "code": "LA6687-3" },
                { "text": "Insertion/Deletion", "code": "LA6688-1" },
                { "text": "Inversion", "code": "LA6689-9" },
                { "text": "Substitution", "code": "LA6690-7" },
                {"text": "Copy number gain", "code": "LA14033-7"},
                {"text": "Copy number loss", "code": "LA14034-5"},
                {"code": "LA26324-6", "text": "Mobile element insertion"},
                {"code": "LA26325-3", "text": "Novel sequence insertion"},
                {"code": "LA26326-1", "text": "Tandem duplication"},
                {"code": "LA26327-9", "text": "Intrachromosomal breakpoint"},
                {"code": "LA26328-7", "text": "Interchromosomal breakpoint"},
                {"code": "LA26331-1", "text": "Translocation"},
                {"code": "LA26330-3", "text": "Complex"},
                {"code": "LA26329-5", "text": "Sequence alteration"}
              ],
              "dataControl": [
                {
                  "source": {
                    "sourceType":"INTERNAL",
                    "sourceItemCode":"81252-9"
                  },
                  "construction":"OBJECT",
                  "dataFormat":{"code": "value.TypeAbbr", "text": "value.TypeAbbr"},
                  "onAttribute":"value"
                },
                { "source" : {
                  "sourceType":"INTERNAL",
                  "sourceItemCode":"83005-9"
                },
                  "construction":"SIMPLE",
                  "dataFormat": "value.dnaChangeTypeList",
                  "onAttribute":"answers"
                }
              ]
            },
            {
              "questionCode": "48006-1",
              "question": "Amino acid change type",
              "dataType": "CWE",
              "answerCardinality": {
                "max": "1",
                "min": "0"
              },
              "answers": [{
                "text": "Wild type",
                "code": "LA9658-1"
              }, {
                "text": "Deletion",
                "code": "LA6692-3"
              }, {
                "text": "Duplication",
                "code": "LA6686-5"
              }, {
                "text": "Frameshift",
                "code": "LA6694-9"
              }, {
                "text": "Initiating Methionine",
                "code": "LA6695-6"
              }, {
                "text": "Insertion",
                "code": "LA6687-3"
              }, {
                "text": "Insertion and Deletion",
                "code": "LA9659-9"
              }, {
                "text": "Missense",
                "code": "LA6698-0"
              }, {
                "text": "Nonsense",
                "code": "LA6699-8"
              }, {
                "text": "Silent",
                "code": "LA6700-4"
              }, {
                "text": "Stop Codon Mutation",
                "code": "LA6701-2"
              }]
            }
            ,
            {
              "questionCode": "X0009-1",
              "question": "Genomic specification",
              "header": true,
              "dataType": "TITLE"
            },
            {"questionCode": "48013-7",
              "question": "Genomic reference sequence",
              "dataType": "CWE",
              "answerCodeSystem": "RefSeq-G",
              "externallyDefined":"https://lforms-service.nlm.nih.gov/api/refseqs/v3/search?q=!RefSeq%3ANM*&sf=RefSeq&df=RefSeq",
              "dataControl": [
                {
                  "source": {
                    "sourceType":"INTERNAL",
                    "sourceItemCode":"81252-9"
                  },
                  "construction":"OBJECT",
                  "dataFormat":{"text": "value.ChromosomeAccession","code": "value.ChromosomeAccession"},
                  "onAttribute":"value"
                }
              ]
            },
            { "questionCode": "81290-9",
              "question": "Genomic DNA change (gHGVS)",
              "dataType": "ST"
            },
            {"questionCode": "69547-8",
              "question": "Genomic ref allele",
              "dataControl": [
                {
                  "source": {
                    "sourceType":"INTERNAL",
                    "sourceItemCode":"81252-9"
                  },
                  "construction":"SIMPLE",
                  "dataFormat":"value.ReferenceAllele",
                  "onAttribute":"value"
                }
              ]
            },
            {"questionCode": "81254-5",
              "question": "Genomic allele start-end",
              "dataType": "NR",
              "dataControl": [
                {
                  "source": {
                    "sourceType":"INTERNAL",
                    "sourceItemCode":"81252-9"
                  },
                  "construction":"SIMPLE",
                  "dataFormat":"value.GenomicLocation",
                  "onAttribute":"value"
                }
              ]
            },
            {"questionCode": "69551-0",
              "question": "Genomic alt allele",
              "dataControl": [
                {
                  "source": {
                    "sourceType":"INTERNAL",
                    "sourceItemCode":"81252-9"
                  },
                  "construction":"SIMPLE",
                  "dataFormat":"value.AlternateAllele",
                  "onAttribute":"value"
                }
              ]
            }
            ,
            {
              "questionCode": "X0010-1",
              "question": "Other optional codes related to a discrete genetic variant",
              "header": true,
              "dataType": "TITLE"
            },
            { "questionCode": "48008-7",
              "question": "Haplotype Name",
              "dataType": "ST"
            },
            {"questionCode": "81255-2",
              "question": "dbSNP ID",
              "dataType": "CNE",
              "answerCardinality": {"max": "1", "min":"0"},
              "answerCodeSystem": "dbSNP",
              "externallyDefined":
                  "https://lforms-service.nlm.nih.gov/api/snps/v3/search?df=rsNum,chr,chrPos,alleles,geneSymbol",
              "displayControl": {
                "listColHeaders": ["ID", "Chromosome", "Chr.&nbsp;Position",
                  "Alleles", "Gene"]
              },
              "dataControl": [
                {
                  "source": {
                    "sourceType":"INTERNAL",
                    "sourceItemCode":"81252-9"
                  },
                  "construction":"OBJECT",
                  "dataFormat":{"text": "value.dbSNP", "code": "value.code"},
                  "onAttribute":"value"
                }
              ]
            },
            {"questionCode": "81257-8",
              "question": "CIGAR",
              "dataType": "ST"
            }
            ,
            {
              "questionCode": "X0011-1",
              "question": "Other possible attributes",
              "header": true,
              "dataType": "TITLE"
            },
            {"questionCode": "48001-2",
              "question": "Cytogenetic location of variant",
              "dataType": "CWE",
              "answerCodeSystem": "Chrom-Loc",
              "externallyDefined":"https://lforms-service.nlm.nih.gov/api/cytogenetic_locs/v3/search",

              "dataControl": [
                {
                  "source": {
                    "sourceType":"INTERNAL",
                    "sourceItemCode":"81252-9"
                  },
                  "construction":"OBJECT",
                  "dataFormat":{"text": "value.Cytogenetic", "code": "value.Cytogenetic"},
                  "onAttribute":"value"
                }
              ]
            },
            {"questionCode": "48002-0",
              "question": "Genomic source class",
              "dataType": "CNE",
              "answerCardinality": {"max": "1", "min":"0"},
              "answers": [
                {"code": "LA6683-2", "text": "Germline"},
                {"code": "LA6684-0", "text": "Somatic"},
                {"code": "LA10429-1", "text": "Prenatal"},
                {"code": "LA18194-3", "text": "Likely germline"},
                {"code": "LA18195-0", "text": "Likely somatic"},
                {"code": "LA18196-8", "text": "Likely prenatal"},
                {"code": "LA18197-6", "text": "Unknown genomic origin"}
              ]
            },
            {
              "questionCode": "81304-8",
              "question": "Variant analysis method type",
              "dataType": "CWE",
              "answerCardinality": {"min":"0", "max": "1"},
              "answers": [
                {"code": "LA26398-0", "text": "Sequencing"},
                {"code": "LA26399-8", "text": "Oligo aCGH"},
                {"code": "LA26400-4", "text": "SNP Array"},
                {"code": "LA26401-2", "text": "BAC aCGH"},
                {"code": "LA26402-0", "text": "Curated"},
                {"code": "LA26403-8", "text": "Digital Array"},
                {"code": "LA26404-6", "text": "FISH"},
                {"code": "LA26405-3", "text": "Gene Expression Array"},
                {"code": "LA26406-1", "text": "Karyotyping"},
                {"code": "LA26407-9", "text": "MAPH"},
                {"code": "LA26408-7", "text": "MassSpec"},
                {"code": "LA26808-8", "text": "Merging"},
                {"code": "LA26414-5", "text": "Multiple Complete Digestion"},
                {"code": "LA26415-2", "text": "MLPA"},
                {"code": "LA26417-8", "text": "Optical Mapping"},
                {"code": "LA26418-6", "text": "PCR"},
                {"code": "LA26419-4", "text": "qPCR (Real-time PCR)"},
                {"code": "LA26420-2", "text": "ROMA"},
                {"code": "LA26809-6", "text": "Denaturing high pressure liquid chromatography (DHPLC)"},
                {"code": "LA26810-4", "text": "DNA hybridization"},
                {"code": "LA26811-2", "text": "Computational analysis"},
                {"code": "LA26812-0", "text": "Single-stranded conformational polymorphism (SSCP)"},
                {"code": "LA26813-8", "text": "Restriction Fragment Length Polymorphism (RFLP)"}
              ]
            }

            ,
            {
              "questionCode": "X0012-1",
              "question": "Interpretations",
              "header": true,
              "dataType": "TITLE"
            },
            {"questionCode": "53037-8",
              "question": "Clinical significance",
              "dataType": "CNE",
              "answerCardinality": {"max": "1", "min":"0"},
              "answers": [{
                "code": "LA6668-3",
                "text": "Pathogenic"
              }, {
                "code": "LA6669-1",
                "text": "Likely Pathogenic"
              }, {
                "code": "LA6671-7",
                "text": "Uncertain Significance"
              }, {
                "code": "LA6674-1",
                "text": "Likely Benign"
              }, {
                "code": "LA6675-8",
                "text": "Benign"
              }]
            },
            {"questionCode": "69548-6",
              "question": "Genomic variant assessment",
              "dataType": "CNE",
              "answerCardinality": {"max": "1", "min":"0"},
              "answers": [
                {"code": "LA9633-4", "text": "Present"},
                {"code": "LA9634-2", "text": "Absent"},
                {"code": "LA18198-4", "text": "No call"},
                {"code": "LA11884-6", "text": "Indeterminate"}
              ]
            },
            {"questionCode": "81259-4",
              "question": "Probable associated phenotype",
              "dataType": "CWE",
              "answerCardinality": {"max": "1", "min":"0"},
              "answerCodeSystem": "Medgen-Dis",
              "externallyDefined":"https://lforms-service.nlm.nih.gov/api/disease_names/v3/search?of=DiseaseName",

              "dataControl": [
                {
                  "source": {
                    "sourceType":"INTERNAL",
                    "sourceItemCode":"81252-9"
                  },
                  "construction":"SIMPLE",
                  "dataFormat":"value.phenotype",
                  "onAttribute":"value"
                }
              ]
            }

            ,
            {
              "questionCode": "X0013-1",
              "question": "Allelic state/phase information",
              "header": true,
              "dataType": "TITLE"
            },
            {
              "questionCode":"53034-5",
              "localQuestionCode":null,
              "dataType":"CNE",
              "header":false,
              "units":null,
              "codingInstructions":"The level of occurrence of a single DNA Marker within a set of chromosomes. Heterozygous indicates the DNA Marker is only present in one of the two genes contained in homologous chromosomes. Homozygous indicates the DNA Marker is present in both genes contained in homologous chromosomes. Hemizygous indicates the DNA Marker exists in the only single copy of a gene in a non-homologous chromosome (The male X and Y chromosome are non-homologous). Hemiplasmic indicates that the DNA Marker is present in some but not all of the copies of mitochondrial DNA. Homoplasmic indicates that the DNA Maker is present in all of the copies of mitochondrial DNA.\r\n",
              "copyrightNotice":null,
              "questionCardinality":null,
              "answerCardinality":{
                "min":"0",
                "max":"1"
              },
              "question":"Allelic state",
              "answers":[
                {
                  "label":null,
                  "code":"LA6703-8",
                  "text":"Heteroplasmic",
                  "score":null,
                  "other":null
                },
                {
                  "label":null,
                  "code":"LA6704-6",
                  "text":"Homoplasmic",
                  "score":null,
                  "other":null
                },
                {
                  "label":null,
                  "code":"LA6705-3",
                  "text":"Homozygous",
                  "score":null,
                  "other":null
                },
                {
                  "label":null,
                  "code":"LA6706-1",
                  "text":"Heterozygous",
                  "score":null,
                  "other":null
                },
                {
                  "label":null,
                  "code":"LA6707-9",
                  "text":"Hemizygous",
                  "score":null,
                  "other":null
                }
              ]
            },
            {"questionCode": "81258-6",
              "question": "Allelic Frequency NFR",
              "dataType": "REAL"
            },
            {"questionCode": "82121-5",
              "question": "Allelic read depth",
              "dataType": "REAL"
            },
            {"questionCode": "82120-7",
              "question": "Allelic phase [Type]",
              "dataType": "CWE",
              "answers": [
                {"code": "LA6112-2", "text": "1"},
                {"code": "LA6113-0", "text": "2"},
                {"code": "LA6114-8", "text": "3"},
                {"code": "LA26320-4", "text": "Maternal"},
                {"code": "LA26321-2", "text": "Paternal"},
                {"code": "LA4489-6", "text": "Unknown"},
                {"code": "LA46-8", "text": "Other"}
              ]
            },
            {
              "questionCode": "82309-6",
              "question": "Basis for allelic phase",
              "dataType": "CNE",
              "answers": [{
                "code": "X1",
                "text": "Directly measured"
              }, {
                "code": "X2",
                "text": "Family DNA"
              }, {
                "code": "X3",
                "text": "Family history"
              }, {
                "code": "X4",
                "text": "Inferred from population data"
              }]
            }

            ,
            { "questionCode": "81297-4",
              "question": "Structural variant addendum panel",
              "skipLogic": {"conditions":[{"source": "83005-9", "trigger": {
                "code": "LA26802-1"}}], "action": "show"},
              "header": true,
              "items" : [
                {"questionCode": "82155-3",
                  "question": "Copy number",
                  "dataType": "INT"
                },
                {"questionCode": "81299-0",
                  "question": "arrCGH ratio",
                  "dataType": "REAL",
                  "answerCardinality": {"max": "1", "min":"0"}
                },
                {"questionCode": "81300-6",
                  "question": "Structural variant length",
                  "dataType": "INT"
                },
                {"questionCode": "81301-4",
                  "question": "Structural variant outer start-end",
                  "dataType": "NR"
                },
                {"questionCode": "81302-2",
                  "question": "Structural variant inner start-end",
                  "dataType": "NR"
                }


              ]
            }

          ]
        }
      ]
    },
    {
      "questionCode": "XP001-0",
      "question": "Pharmacogenomics gene results panel",
      "skipLogic": {"conditions":[{"source": "XXXXX-12", "trigger": {"code": "C04"}}],
        "action": "show"},
      "header": true,
      "layout": "vertical",
      "questionCardinality": {"max": "*"},
      "items": [
        {
          "questionCode": "48018-6",
          "question": "Gene(s) studied",
          "dataType": "CWE",
          "answerCardinality": {"min": "0", "max": "*"},
          "answerCodeSystem": "HGNC-Symb",
          "displayControl": {
            "listColHeaders": ["Symbol", "HGNC&nbsp;ID", "Name", "Location"]
          },
          "externallyDefined":"https://lforms-service.nlm.nih.gov/api/genes/v3/search?df=symbol,hgnc_id,name_mod,location"

        },
        {
          "questionCode": "47998-0",
          "question": "Genotype display name",
          "dataType": "ST"
        },
        {
          "questionCode": "X00D3-0",
          "question": "Cross reference to full genetic details",
          "dataType": "ST"
        },
        {
          "questionCode": "53040-2",
          "question": "Genetic variation's effect on drug metabolism",
          "dataType": "CWE",
          "answers": [{
            "text": "Ultrarapid metabolizer",
            "code": "LA10315-2"
          }, {
            "text": "Rapid metabolizer",
            "code": "LA25390-8"
          }, {
            "text": "Normal metabolizer",
            "code": "LA25391-6"
          }, {
            "text": "Intermediate metabolizer",
            "code": "LA10317-8"
          }, {
            "text": "Poor metabolizer",
            "code": "LA9657-3"
          }]
        },
        {
          "questionCode": "51961-1",
          "question": "Genetic variation's effect on drug efficacy",
          "dataType": "CWE",
          "answers": [
            {"text": "Resistant", "code": "LA6676-6"},
            {"text": "Responsive", "code": "LA6677-4"},
            {"text": "Presumed resistant", "code": "LA9660-7"},
            {"text": "Presumed responsive", "code": "LA9661-5"},
            {"text": "Unknown Significance", "code": "LA6682-4"},
            {"text": "Benign", "code": "LA6675-8"},
            {"text": "Presumed Benign", "code": "LA6674-1"},
            {"text": "Presumed non-responsive", "code": "LA9662-3"}
          ]
        },
        {
          "questionCode": "83009-1",
          "question": "Genetic variation’s risk for hypersensitivity",
          "dataType": "CWE",
          "answers": [
            {"text": "Low risk", "code": "LA19542-2"},
            {"text": "High risk", "code": "LA19541-4"}
          ]
        },
        {
          "questionCode": "82117-3",
          "question": "Medication usage implications panel",
          "header": true,
          "layout": "vertical",
          "questionCardinality": {"max": "*"},
          "items": [
            {
              "questionCode": "51963-7",
              "question": "Medication assessed",
              "dataType": "CWE",
              "answerCodeSystem": "RxT-Ingrd",
              "externallyDefined":"https://lforms-service.nlm.nih.gov/api/drug_ingredients/v3/search"

            },
            {
              "questionCode": "82116-5",
              "question": "Medication usage suggestion [type]",
              "dataType": "CWE",
              "answers": [
                {"code": "1", "text": "Consider Alternative Medication"},
                {"code": "2", "text": "Decrease Dose"},
                {"code": "3", "text": "Increase Dose"},
                {"code": "4", "text": "Use Caution"},
                {"code": "5", "text": "Normal Response Expected"}
              ]
            },
            {
              "questionCode": "XP006-0",
              "question": "Medication usage suggestion [narrative]",
              "dataType": "TX"
            }
          ]
        }
      ]
    }



  ]
};


var defaultAnswerForm = {
  "type": "LOINC",
  "code": "defaultAnswerForm",
  "name": "Fields with default answers",
  "items": [
    {
      "question": "Integer field with default",
      "questionCode": "intField",
      "questionCardinality": {
        "min": "1",
        "max": "1"
      },
      "header": false,
      "editable": "1",
      "answerCardinality": {
        "min": "0",
        "max": "1"
      },
      "dataType": "INT",
      "defaultAnswer": 24,
      "displayControl": {},
      "questionCodeSystem": "LOINC"
    },
    {
      "question": "Decimal field",
      "questionCode": "decField",
      "questionCardinality": {
        "min": "1",
        "max": "1"
      },
      "header": false,
      "editable": "1",
      "answerCardinality": {
        "min": "0",
        "max": "1"
      },
      "dataType": "REAL",
      "defaultAnswer": 3.14159,
      "displayControl": {},
      "questionCodeSystem": "LOINC"
    },
    {
      "question": "String field",
      "questionCode": "strField",
      "questionCardinality": {
        "min": "1",
        "max": "1"
      },
      "header": false,
      "editable": "1",
      "answerCardinality": {
        "min": "0",
        "max": "1"
      },
      "dataType": "ST",
      "defaultAnswer": "Green",
      "displayControl": {},
      "questionCodeSystem": "LOINC"
    },
    {
      "question": "Date field",
      "questionCode": "dateField",
      "questionCardinality": {
        "min": "1",
        "max": "1"
      },
      "header": false,
      "editable": "1",
      "answerCardinality": {
        "min": "0",
        "max": "1"
      },
      "dataType": "DT",
      "defaultAnswer": "t",
      "displayControl": {},
      "questionCodeSystem": "LOINC"
    },
    {
      "question": "List via answer label",
      "questionCode": "ansLabelDefault",
      "questionCardinality": {
        "min": "1",
        "max": "1"
      },
      "header": false,
      "editable": "1",
      "answerCardinality": {
        "min": "0",
        "max": "1"
      },
      "dataType": "CWE",
      "answers": [
        {"text": "Red", "code": "R", "label": "i" },
        {"text": "Blue", "code": "B", "label": "ii" },
        {"text": "Green", "code": "G", "label": "iii" }
      ],
      "defaultAnswer": {"label": "ii"}
    },
    {
      "question": "List via answer code",
      "questionCode": "ansCodeDefault",
      "questionCardinality": {
        "min": "1",
        "max": "1"
      },
      "header": false,
      "editable": "1",
      "answerCardinality": {
        "min": "0",
        "max": "1"
      },
      "dataType": "CNE",
      "answers": [
        {"text": "Red", "code": "R", "label": "i" },
        {"text": "Blue", "code": "B", "label": "ii" },
        {"text": "Green", "code": "G", "label": "iii" }
      ],
      "defaultAnswer": {"code": "B"}
    },
    {
      "question": "List via answer code, unlabeled",
      "questionCode": "ansCodeDefaultNoLabel",
      "questionCardinality": {
        "min": "1",
        "max": "1"
      },
      "header": false,
      "editable": "1",
      "answerCardinality": {
        "min": "0",
        "max": "1"
      },
      "dataType": "CNE",
      "answers": [
        {"text": "Red", "code": "R"},
        {"text": "Blue", "code": "B"},
        {"text": "Green", "code": "G"}
      ],
      "defaultAnswer": {"code": "B"}
    },
    {
      "question": "Radio buttons via answer code",
      "questionCode": "radioAnsCodeDefault",
      "questionCardinality": {
        "min": "1",
        "max": "1"
      },
      "header": false,
      "editable": "1",
      "answerCardinality": {
        "min": "0",
        "max": "1"
      },
      "dataType": "CNE",
      "answers": [
        {"text": "Red", "code": "R", "label": "i" },
        {"text": "Blue", "code": "B", "label": "ii" },
        {"text": "Green", "code": "G", "label": "iii" }
      ],
      "defaultAnswer": {"code": "B"},
      "displayControl": {
        "answerLayout": {
          "type": "RADIO_CHECKBOX",
          "columns": 2
        }
      }
    },
    {
      "question": "Check boxes via answer code",
      "questionCode": "checkBoxAnsCodeDefault",
      "questionCardinality": {
        "min": "1",
        "max": "1"
      },
      "header": false,
      "editable": "1",
      "answerCardinality": {
        "min": "0",
        "max": "*"
      },
      "dataType": "CNE",
      "answers": [
        {"text": "Red", "code": "R", "label": "i" },
        {"text": "Blue", "code": "B", "label": "ii" },
        {"text": "Green", "code": "G", "label": "iii" }
      ],
      "defaultAnswer": {"code": "B"},
      "displayControl": {
        "answerLayout": {
          "type": "RADIO_CHECKBOX",
          "columns": 2
        }
      }
    },
    {
      "question": "Radio buttons via answer code, unlabeled",
      "questionCode": "radioAnsCodeDefaultNoLabel",
      "questionCardinality": {
        "min": "1",
        "max": "1"
      },
      "header": false,
      "editable": "1",
      "answerCardinality": {
        "min": "0",
        "max": "1"
      },
      "dataType": "CNE",
      "answers": [
        {"text": "Red", "code": "R"},
        {"text": "Blue", "code": "B"},
        {"text": "Green", "code": "G"}
      ],
      "defaultAnswer": {"code": "B"},
      "displayControl": {
        "answerLayout": {
          "type": "RADIO_CHECKBOX",
          "columns": 2
        }
      }
    },
    {
      "question": "Multi-select list via answer code",
      "questionCode": "multiSelAnsCodeDefault",
      "questionCardinality": {
        "min": "1",
        "max": "1"
      },
      "header": false,
      "editable": "1",
      "answerCardinality": {
        "min": "0",
        "max": "*"
      },
      "dataType": "CNE",
      "answers": [
        {"text": "Red", "code": "R", "label": "i" },
        {"text": "Blue", "code": "B", "label": "ii" },
        {"text": "Green", "code": "G", "label": "iii" }
      ],
      "defaultAnswer": {"code": "B"}
    },
    {
      "question": "List via answer text (not in specification)",
      "questionCode": "ansTextDefault",
      "questionCardinality": {
        "min": "1",
        "max": "1"
      },
      "header": false,
      "editable": "1",
      "answerCardinality": {
        "min": "0",
        "max": "1"
      },
      "dataType": "CWE",
      "answers": [
        {"text": "Red", "code": "R"},
        {"text": "Blue", "code": "B"},
        {"text": "Green", "code": "G"}
      ],
      "defaultAnswer": "Blue"
    }
  ],
  "templateOptions": {
    "formHeaderItems": [{
      "question": "Date Done",
      "questionCode": "date_done",
      "dataType": "DT",
      "answers": "",
      "answerCardinality": {"min": "1", "max": "1"},
      "displayControl": {"colCSS": [{"name": "width", "value": "10em"}, {"name": "min-width", "value": "4em"}]},
      "defaultAnswer": "t"
    }, {
      "question": "Time Done",
      "questionCode": "time_done",
      "dataType": "TM",
      "answers": "",
      "displayControl": {"colCSS": [{"name": "width", "value": "12em"}, {"name": "min-width", "value": "4em"}]}
    }, {
      "question": "Where Done",
      "questionCode": "where_done",
      "dataType": "CWE",
      "answers": [{"text": "Home", "code": "1"}, {"text": "Hospital", "code": "2"}, {
        "text": "MD Office",
        "code": "3"
      }, {"text": "Lab", "code": "4"}, {"text": "Other", "code": "5"}],
      "displayControl": {"colCSS": [{"name": "width", "value": "30%"}, {"name": "min-width", "value": "4em"}]}
    }, {
      "question": "Comment",
      "questionCode": "comment",
      "dataType": "ST",
      "answers": "",
      "displayControl": {"colCSS": [{"name": "width", "value": "70%"}, {"name": "min-width", "value": "4em"}]}
    }]
  }
};

var twoTotalScore =
    {
      "type": "LOINC",
      "code": "two-totalscore",
      "name": "A Form with 2 TOTALSCORE fields",
      "items": [
        {
          "question": "PHQ-9 quick depression assessment panel",
          "questionCodeSystem": "LOINC",
          "questionCode": "44249-1",
          "codingInstructions": "Over the last 2 weeks, how often have you been bothered by any of the following problems?\r\n\r\nThe Patient Health Questionnaire is a self-administered version of the PRIME-MD diagnostic instrument for common mental disorders. The PHQ-9 is the depression module, which scores each of the 9 DSM-IV criteria as \"0\" (not at all) to \"3\" (nearly every day).\r\nFor initial diagnosis:\r\n1. Patient completes PHQ-9 Quick Depression Assessment on accompanying tear-off pad.\r\n2. If there are at least 4 checks in the blue highlighted section (including Questions #1 and #2), consider a depressive disorder. Add score to determine severity.\r\n3a. Consider Major Depressive Disorder: if there are at least 5 checks in the blue highlighted section (one of which corresponds to Question #1 or #2).\r\n3b. Consider Other Depressive Disorder: if there are 2 to 4 checks in the blue highlighted section (one of which corresponds to Question #1 or #2)\r\n\r\nNote: Since the questionnaire relies on patient self-report, all responses should be verified by the clinician and a definitive diagnosis made on clinical grounds, taking into account how well the patient understood the questionnaire, as well as other relevant information from the patient. Diagnoses of Major Depressive Disorder or Other Depressive Disorder also require impairment of social, occupational, or other important areas of functioning (Question #10) and ruling out normal bereavement, a history of a Manic Episode (Bipolar Disorder), and a physical disorder, medication, or other drug as the biological cause of the depressive symptoms.\r\n\r\nTo monitor severity over time for newly diagnosed patients or patients in current treatment for depression:\r\n\r\n1. Patients may complete questionnaires at baseline and at regular intervals (eg, every 2 weeks) at home and bring them in at their next appointment for scoring or they may complete the questionnaire during each scheduled appointment.\r\n2. Add up the checks by column. For every check: Several days = 1 More than half the days = 2 Nearly every day = 3\r\n3. Add together column scores to get a TOTAL score.\r\n4. Refer to the accompanying PHQ-9 Scoring Card to interpret the TOTAL score.\r\n5. Results may be included in patients' files to assist you in setting up a treatment goal, determining degree of response, as well as guiding treatment intervention.\r\n\r\nPHQ-9 is adapted from PRIME MD TODAY, developed by Drs Robert L. Spitzer, Janet B.W. Williams, Kurt Kroenke, and colleagues, with an educational grant from Pfizer Inc. For research information, contact Dr Spitzer at rls8@columbia.edu.",
          "questionCardinality": {
            "min": "1",
            "max": "1"
          },
          "header": true,
          "editable": "1",
          "answerCardinality": {
            "min": "0",
            "max": "1"
          },
          "dataType": "ST",
          "copyrightNotice": "Copyright © Pfizer Inc. All rights reserved. Developed by Drs. Robert L. Spitzer, Janet B.W. Williams, Kurt Kroenke and colleagues, with an educational grant from Pfizer Inc. No permission required to reproduce, translate, display or distribute.",
          "items": [
            {
              "question": "Little interest or pleasure in doing things?",
              "questionCodeSystem": "LOINC",
              "questionCode": "44250-9",
              "questionCardinality": {
                "min": "1",
                "max": "1"
              },
              "header": false,
              "editable": "1",
              "answerCardinality": {
                "min": "1",
                "max": "1"
              },
              "dataType": "CNE",
              "answers": [
                {
                  "text": "Not at all",
                  "code": "LA6568-5",
                  "label": "0",
                  "score": 0
                },
                {
                  "text": "Several days",
                  "code": "LA6569-3",
                  "label": "1",
                  "score": 1
                },
                {
                  "text": "More than half the days",
                  "code": "LA6570-1",
                  "label": "2",
                  "score": 2
                },
                {
                  "text": "Nearly every day",
                  "code": "LA6571-9",
                  "label": "3",
                  "score": 3
                }
              ],
              "copyrightNotice": "Copyright © Pfizer Inc. All rights reserved. Developed by Drs. Robert L. Spitzer, Janet B.W. Williams, Kurt Kroenke and colleagues, with an educational grant from Pfizer Inc. No permission required to reproduce, translate, display or distribute."
            },
            {
              "question": "Feeling down, depressed, or hopeless?",
              "questionCodeSystem": "LOINC",
              "questionCode": "44255-8",
              "questionCardinality": {
                "min": "1",
                "max": "1"
              },
              "header": false,
              "editable": "1",
              "answerCardinality": {
                "min": "1",
                "max": "1"
              },
              "dataType": "CNE",
              "answers": [
                {
                  "text": "Not at all",
                  "code": "LA6568-5",
                  "label": "0",
                  "score": 0
                },
                {
                  "text": "Several days",
                  "code": "LA6569-3",
                  "label": "1",
                  "score": 1
                },
                {
                  "text": "More than half the days",
                  "code": "LA6570-1",
                  "label": "2",
                  "score": 2
                },
                {
                  "text": "Nearly every day",
                  "code": "LA6571-9",
                  "label": "3",
                  "score": 3
                }
              ],
              "copyrightNotice": "Copyright © Pfizer Inc. All rights reserved. Developed by Drs. Robert L. Spitzer, Janet B.W. Williams, Kurt Kroenke and colleagues, with an educational grant from Pfizer Inc. No permission required to reproduce, translate, display or distribute."
            },
            {
              "question": "Trouble falling or staying asleep, or sleeping too much",
              "questionCodeSystem": "LOINC",
              "questionCode": "44259-0",
              "questionCardinality": {
                "min": "1",
                "max": "1"
              },
              "header": false,
              "editable": "1",
              "answerCardinality": {
                "min": "1",
                "max": "1"
              },
              "dataType": "CNE",
              "answers": [
                {
                  "text": "Not at all",
                  "code": "LA6568-5",
                  "label": "0",
                  "score": 0
                },
                {
                  "text": "Several days",
                  "code": "LA6569-3",
                  "label": "1",
                  "score": 1
                },
                {
                  "text": "More than half the days",
                  "code": "LA6570-1",
                  "label": "2",
                  "score": 2
                },
                {
                  "text": "Nearly every day",
                  "code": "LA6571-9",
                  "label": "3",
                  "score": 3
                }
              ],
              "copyrightNotice": "Copyright © Pfizer Inc. All rights reserved. Developed by Drs. Robert L. Spitzer, Janet B.W. Williams, Kurt Kroenke and colleagues, with an educational grant from Pfizer Inc. No permission required to reproduce, translate, display or distribute."
            },
            {
              "question": "Feeling tired or having little energy",
              "questionCodeSystem": "LOINC",
              "questionCode": "44254-1",
              "questionCardinality": {
                "min": "1",
                "max": "1"
              },
              "header": false,
              "editable": "1",
              "answerCardinality": {
                "min": "1",
                "max": "1"
              },
              "dataType": "CNE",
              "answers": [
                {
                  "text": "Not at all",
                  "code": "LA6568-5",
                  "label": "0",
                  "score": 0
                },
                {
                  "text": "Several days",
                  "code": "LA6569-3",
                  "label": "1",
                  "score": 1
                },
                {
                  "text": "More than half the days",
                  "code": "LA6570-1",
                  "label": "2",
                  "score": 2
                },
                {
                  "text": "Nearly every day",
                  "code": "LA6571-9",
                  "label": "3",
                  "score": 3
                }
              ],
              "copyrightNotice": "Copyright © Pfizer Inc. All rights reserved. Developed by Drs. Robert L. Spitzer, Janet B.W. Williams, Kurt Kroenke and colleagues, with an educational grant from Pfizer Inc. No permission required to reproduce, translate, display or distribute."
            },
            {
              "question": "Poor appetite or overeating",
              "questionCodeSystem": "LOINC",
              "questionCode": "44251-7",
              "questionCardinality": {
                "min": "1",
                "max": "1"
              },
              "header": false,
              "editable": "1",
              "answerCardinality": {
                "min": "1",
                "max": "1"
              },
              "dataType": "CNE",
              "answers": [
                {
                  "text": "Not at all",
                  "code": "LA6568-5",
                  "label": "0",
                  "score": 0
                },
                {
                  "text": "Several days",
                  "code": "LA6569-3",
                  "label": "1",
                  "score": 1
                },
                {
                  "text": "More than half the days",
                  "code": "LA6570-1",
                  "label": "2",
                  "score": 2
                },
                {
                  "text": "Nearly every day",
                  "code": "LA6571-9",
                  "label": "3",
                  "score": 3
                }
              ],
              "copyrightNotice": "Copyright © Pfizer Inc. All rights reserved. Developed by Drs. Robert L. Spitzer, Janet B.W. Williams, Kurt Kroenke and colleagues, with an educational grant from Pfizer Inc. No permission required to reproduce, translate, display or distribute."
            },
            {
              "question": "Feeling bad about yourself-or that you are a failure or have let yourself or your family down",
              "questionCodeSystem": "LOINC",
              "questionCode": "44258-2",
              "questionCardinality": {
                "min": "1",
                "max": "1"
              },
              "header": false,
              "editable": "1",
              "answerCardinality": {
                "min": "1",
                "max": "1"
              },
              "dataType": "CNE",
              "answers": [
                {
                  "text": "Not at all",
                  "code": "LA6568-5",
                  "label": "0",
                  "score": 0
                },
                {
                  "text": "Several days",
                  "code": "LA6569-3",
                  "label": "1",
                  "score": 1
                },
                {
                  "text": "More than half the days",
                  "code": "LA6570-1",
                  "label": "2",
                  "score": 2
                },
                {
                  "text": "Nearly every day",
                  "code": "LA6571-9",
                  "label": "3",
                  "score": 3
                }
              ],
              "copyrightNotice": "Copyright © Pfizer Inc. All rights reserved. Developed by Drs. Robert L. Spitzer, Janet B.W. Williams, Kurt Kroenke and colleagues, with an educational grant from Pfizer Inc. No permission required to reproduce, translate, display or distribute."
            },
            {
              "question": "Trouble concentrating on things, such as reading the newspaper or watching television",
              "questionCodeSystem": "LOINC",
              "questionCode": "44252-5",
              "questionCardinality": {
                "min": "1",
                "max": "1"
              },
              "header": false,
              "editable": "1",
              "answerCardinality": {
                "min": "1",
                "max": "1"
              },
              "dataType": "CNE",
              "answers": [
                {
                  "text": "Not at all",
                  "code": "LA6568-5",
                  "label": "0",
                  "score": 0
                },
                {
                  "text": "Several days",
                  "code": "LA6569-3",
                  "label": "1",
                  "score": 1
                },
                {
                  "text": "More than half the days",
                  "code": "LA6570-1",
                  "label": "2",
                  "score": 2
                },
                {
                  "text": "Nearly every day",
                  "code": "LA6571-9",
                  "label": "3",
                  "score": 3
                }
              ],
              "copyrightNotice": "Copyright © Pfizer Inc. All rights reserved. Developed by Drs. Robert L. Spitzer, Janet B.W. Williams, Kurt Kroenke and colleagues, with an educational grant from Pfizer Inc. No permission required to reproduce, translate, display or distribute."
            },
            {
              "question": "Moving or speaking so slowly that other people could have noticed. Or the opposite-being so fidgety or restless that you have been moving around a lot more than usual",
              "questionCodeSystem": "LOINC",
              "questionCode": "44253-3",
              "questionCardinality": {
                "min": "1",
                "max": "1"
              },
              "header": false,
              "editable": "1",
              "answerCardinality": {
                "min": "1",
                "max": "1"
              },
              "dataType": "CNE",
              "answers": [
                {
                  "text": "Not at all",
                  "code": "LA6568-5",
                  "label": "0",
                  "score": 0
                },
                {
                  "text": "Several days",
                  "code": "LA6569-3",
                  "label": "1",
                  "score": 1
                },
                {
                  "text": "More than half the days",
                  "code": "LA6570-1",
                  "label": "2",
                  "score": 2
                },
                {
                  "text": "Nearly every day",
                  "code": "LA6571-9",
                  "label": "3",
                  "score": 3
                }
              ],
              "copyrightNotice": "Copyright © Pfizer Inc. All rights reserved. Developed by Drs. Robert L. Spitzer, Janet B.W. Williams, Kurt Kroenke and colleagues, with an educational grant from Pfizer Inc. No permission required to reproduce, translate, display or distribute."
            },
            {
              "question": "Thoughts that you would be better off dead, or of hurting yourself in some way",
              "questionCodeSystem": "LOINC",
              "questionCode": "44260-8",
              "questionCardinality": {
                "min": "1",
                "max": "1"
              },
              "header": false,
              "editable": "1",
              "answerCardinality": {
                "min": "0",
                "max": "1"
              },
              "dataType": "CNE",
              "answers": [
                {
                  "text": "Not at all",
                  "code": "LA6568-5",
                  "label": "0",
                  "score": 0
                },
                {
                  "text": "Several days",
                  "code": "LA6569-3",
                  "label": "1",
                  "score": 1
                },
                {
                  "text": "More than half the days",
                  "code": "LA6570-1",
                  "label": "2",
                  "score": 2
                },
                {
                  "text": "Nearly every day",
                  "code": "LA6571-9",
                  "label": "3",
                  "score": 3
                }
              ],
              "copyrightNotice": "Copyright © Pfizer Inc. All rights reserved. Developed by Drs. Robert L. Spitzer, Janet B.W. Williams, Kurt Kroenke and colleagues, with an educational grant from Pfizer Inc. No permission required to reproduce, translate, display or distribute."
            },
            {
              "question": "Patient health questionnaire 9 item total score",
              "questionCodeSystem": "LOINC",
              "questionCode": "44261-6",
              "codingInstructions": "The PHQ-9 is the standard (and most commonly used) depression measure, and it ranges from 0-27 Scoring: Add up all checked boxes on PHQ-9. For every check: Not at all = 0; Several days = 1; More than half the days = 2; Nearly every day = 3 (the scores are the codes that appear in the answer list for each of the PHQ-9 problem panel terms). Interpretation: 1-4 = Minimal depression; 5-9 = Mild depression; 10-14 = Moderate depression; 15-19 = Moderately severe depression; 20-27 = Severed depression.",
              "questionCardinality": {
                "min": "1",
                "max": "1"
              },
              "header": false,
              "editable": "1",
              "answerCardinality": {
                "min": "0",
                "max": "1"
              },
              "dataType": "REAL",
              "units": [
                {
                  "name": "{score}"
                }
              ],
              "calculationMethod": {
                "name": "TOTALSCORE"
              },
              "copyrightNotice": "Copyright © Pfizer Inc. All rights reserved. Developed by Drs. Robert L. Spitzer, Janet B.W. Williams, Kurt Kroenke and colleagues, with an educational grant from Pfizer Inc. No permission required to reproduce, translate, display or distribute."
            },
            {
              "question": "How difficult have these problems made it for you to do your work, take care of things at home, or get along with other people?",
              "questionCodeSystem": "LOINC",
              "questionCode": "69722-7",
              "codingInstructions": "If you checked off any problems on this questionnaire",
              "questionCardinality": {
                "min": "1",
                "max": "1"
              },
              "header": false,
              "editable": "1",
              "answerCardinality": {
                "min": "0",
                "max": "1"
              },
              "dataType": "CNE",
              "answers": [
                {
                  "text": "Not difficult at all",
                  "code": "LA6572-7",
                  "label": null,
                  "score": null
                },
                {
                  "text": "Somewhat difficult",
                  "code": "LA6573-5",
                  "label": null,
                  "score": null
                },
                {
                  "text": "Very difficult",
                  "code": "LA6575-0",
                  "label": null,
                  "score": null
                },
                {
                  "text": "Extremely difficult",
                  "code": "LA6574-3",
                  "label": null,
                  "score": null
                }
              ],
              "copyrightNotice": "Copyright © Pfizer Inc. All rights reserved. Developed by Drs. Robert L. Spitzer, Janet B.W. Williams, Kurt Kroenke and colleagues, with an educational grant from Pfizer Inc. No permission required to reproduce, translate, display or distribute."
            }
          ]
        },
        {
          "question": "FLACC pain assessment panel",
          "questionCodeSystem": "LOINC",
          "questionCode": "38213-5",
          "codingInstructions": "The Faces, Legs, Activity, Cry, and Consolability (FLACC) scale is a behavioral pain assessment scale that can be used with non/pre-verbal patients (young children). Zero, one or two points is assigned to each of the five categories; total score ranges from zero to ten.",
          "questionCardinality": {
            "min": "1",
            "max": "1"
          },
          "header": true,
          "editable": "1",
          "answerCardinality": {
            "min": "0",
            "max": "1"
          },
          "dataType": "ST",
          "copyrightNotice": "Copyright © 2002 The Regents of the University of Michigan Include the following when printing the FLACC on documentation records, etc: Printed with permission © 2002, The Regents of the University of Michigan",
          "items": [
            {
              "question": "Pain severity Face FLACC",
              "questionCodeSystem": "LOINC",
              "questionCode": "38216-8",
              "questionCardinality": {
                "min": "1",
                "max": "1"
              },
              "header": false,
              "editable": "1",
              "answerCardinality": {
                "min": "0",
                "max": "1"
              },
              "dataType": "CNE",
              "answers": [
                {
                  "text": "No particular expression or smile",
                  "code": "LA9588-0",
                  "label": "0",
                  "score": 0
                },
                {
                  "text": "Occasional grimace or frown, withdrawn, disinterested",
                  "code": "LA9589-8",
                  "label": "1",
                  "score": 1
                },
                {
                  "text": "Frequent to constant frown, clenched jaw, quivering chin",
                  "code": "LA9590-6",
                  "label": "2",
                  "score": 2
                }
              ],
              "copyrightNotice": "Copyright © 2002 The Regents of the University of Michigan Include the following when printing the FLACC on documentation records, etc: Printed with permission © 2002, The Regents of the University of Michigan"
            },
            {
              "question": "Pain severity Legs FLACC",
              "questionCodeSystem": "LOINC",
              "questionCode": "38217-6",
              "questionCardinality": {
                "min": "1",
                "max": "1"
              },
              "header": false,
              "editable": "1",
              "answerCardinality": {
                "min": "0",
                "max": "1"
              },
              "dataType": "CNE",
              "answers": [
                {
                  "text": "Normal position or relaxed",
                  "code": "LA9591-4",
                  "label": "0",
                  "score": 0
                },
                {
                  "text": "Uneasy, restless, tense",
                  "code": "LA9592-2",
                  "label": "1",
                  "score": 1
                },
                {
                  "text": "Kicking, or legs drawn up",
                  "code": "LA9593-0",
                  "label": "2",
                  "score": 2
                }
              ],
              "copyrightNotice": "Copyright © 2002 The Regents of the University of Michigan Include the following when printing the FLACC on documentation records, etc: Printed with permission © 2002, The Regents of the University of Michigan"
            },
            {
              "question": "Pain severity Activity FLACC",
              "questionCodeSystem": "LOINC",
              "questionCode": "38218-4",
              "questionCardinality": {
                "min": "1",
                "max": "1"
              },
              "header": false,
              "editable": "1",
              "answerCardinality": {
                "min": "0",
                "max": "1"
              },
              "dataType": "CNE",
              "answers": [
                {
                  "text": "Lying quietly, normal position, moves easily",
                  "code": "LA9594-8",
                  "label": "0",
                  "score": 0
                },
                {
                  "text": "Squirming, shifting back and forth, tense",
                  "code": "LA9595-5",
                  "label": "1",
                  "score": 1
                },
                {
                  "text": "Arched, rigid, or jerking",
                  "code": "LA9596-3",
                  "label": "2",
                  "score": 2
                }
              ],
              "copyrightNotice": "Copyright © 2002 The Regents of the University of Michigan Include the following when printing the FLACC on documentation records, etc: Printed with permission © 2002, The Regents of the University of Michigan"
            },
            {
              "question": "Pain severity Cry FLACC",
              "questionCodeSystem": "LOINC",
              "questionCode": "38219-2",
              "questionCardinality": {
                "min": "1",
                "max": "1"
              },
              "header": false,
              "editable": "1",
              "answerCardinality": {
                "min": "0",
                "max": "1"
              },
              "dataType": "CNE",
              "answers": [
                {
                  "text": "No cry (awake or asleep)",
                  "code": "LA9597-1",
                  "label": "0",
                  "score": 0
                },
                {
                  "text": "Moans or whimpers, occasional complaint",
                  "code": "LA9598-9",
                  "label": "1",
                  "score": 1
                },
                {
                  "text": "Crying steadily, screams or sobs, frequent complaints",
                  "code": "LA9599-7",
                  "label": "2",
                  "score": 2
                }
              ],
              "copyrightNotice": "Copyright © 2002 The Regents of the University of Michigan Include the following when printing the FLACC on documentation records, etc: Printed with permission © 2002, The Regents of the University of Michigan"
            },
            {
              "question": "Pain severity Consolability FLACC",
              "questionCodeSystem": "LOINC",
              "questionCode": "38220-0",
              "questionCardinality": {
                "min": "1",
                "max": "1"
              },
              "header": false,
              "editable": "1",
              "answerCardinality": {
                "min": "0",
                "max": "1"
              },
              "dataType": "CNE",
              "answers": [
                {
                  "text": "Content, relaxed",
                  "code": "LA9600-3",
                  "label": "0",
                  "score": 0
                },
                {
                  "text": "Reassured by occasional touching, hugging, or being talked to, distractable",
                  "code": "LA9601-1",
                  "label": "1",
                  "score": 1
                },
                {
                  "text": "Difficult to console or comfort",
                  "code": "LA9602-9",
                  "label": "2",
                  "score": 2
                }
              ],
              "copyrightNotice": "Copyright © 2002 The Regents of the University of Michigan Include the following when printing the FLACC on documentation records, etc: Printed with permission © 2002, The Regents of the University of Michigan"
            },
            {
              "question": "Pain severity total Score FLACC",
              "questionCodeSystem": "LOINC",
              "questionCode": "38215-0",
              "questionCardinality": {
                "min": "1",
                "max": "1"
              },
              "header": false,
              "editable": "1",
              "answerCardinality": {
                "min": "0",
                "max": "1"
              },
              "dataType": "REAL",
              "units": [
                {
                  "name": "{score}"
                }
              ],
              "calculationMethod": {
                "name": "TOTALSCORE"
              },
              "copyrightNotice": "Copyright © 2002 The Regents of the University of Michigan Include the following when printing the FLACC on documentation records, etc: Printed with permission © 2002, The Regents of the University of Michigan"
            }
          ]
        }
      ],
      "templateOptions": {
        "showFormHeader": false,
        "hideFormControls": true,
        "viewMode": "md"
      }
    };


var vitalSign = {
  "type": "LOINC",
  "code": "74728-7",
  "name": "Vital signs, weight, height, head circumference, oximetry, BMI, & BSA panel",
  "dataType": null,
  "header": true,
  "units": null,
  "codingInstructions": "This panel was created to collect the set of vital sign observations that was orginally defined by HL7 and called the â€œVital Sign Result Type Value Setâ€ in the HL7 Implementation Guide for CDA R2: IHE Health Story Consolidation, DSTU R1.1 (also know as Consolidated CDA), but it is not limited for use in that context. This HL7 implementation guide is the one named in the â€œMeaningful Use Stage 2â€ regulations in the United States. This collection includes the standard vital sign measurements (heart and respiratory rate, blood pressure and body temperature) along with measurements for height, weight, head circumference (OFC), oximetry, body mass index (BMI), and body surface area (BSA).",
  "copyrightNotice": null,
  "items": [
    {
      "questionCode": "2710-2",
      "localQuestionCode": null,
      "dataType": null,
      "header": false,
      "units": [
        {
          "name": "%",
          "default": false,
          "normalRange": null,
          "absoluteRange": null
        }
      ],
      "codingInstructions": null,
      "copyrightNotice": null,
      "questionCardinality": null,
      "answerCardinality": null,
      "question": "SaO2 % BldC Oximetry",
      "answers": null,
      "skipLogic": null,
      "restrictions": null,
      "editable": null,
      "defaultAnswer": null,
      "formatting": null,
      "calculationMethod": null,
      "items": null
    },
    {
      "questionCode": "3141-9",
      "localQuestionCode": null,
      "dataType": "REAL",
      "header": false,
      "units": [{"name": "lbs", "default": true}, {"name": "kgs"}],
      "codingInstructions": null,
      "copyrightNotice": null,
      "questionCardinality": null,
      "answerCardinality": null,
      "question": "Weight Measured",
      "answers": null,
      "skipLogic": null,
      "restrictions": null,
      "editable": null,
      "defaultAnswer": null,
      "formatting": null,
      "calculationMethod": null,
      "items": null
    },
    {
      "questionCode": "8287-5",
      "localQuestionCode": null,
      "dataType": null,
      "header": false,
      "units": [
        {
          "name": "cm",
          "default": false,
          "normalRange": null,
          "absoluteRange": null
        }
      ],
      "codingInstructions": null,
      "copyrightNotice": null,
      "questionCardinality": null,
      "answerCardinality": null,
      "question": "Head Circumf OFC by Tape measure",
      "answers": null,
      "skipLogic": null,
      "restrictions": null,
      "editable": null,
      "defaultAnswer": null,
      "formatting": null,
      "calculationMethod": null,
      "items": null
    },
    {
      "questionCode": "8302-2",
      "localQuestionCode": null,
      "dataType": "REAL",
      "header": false,
      "units": [
        {
          "name": "inches",
          "default": true,
          "normalRange": null,
          "absoluteRange": null
        },
        {
          "name": "feet",
          "default": false,
          "normalRange": null,
          "absoluteRange": null
        },
        {
          "name": "centimeters",
          "default": false,
          "normalRange": null,
          "absoluteRange": null
        },
        {
          "name": "meters",
          "default": false,
          "normalRange": null,
          "absoluteRange": null
        }
      ],
      "codingInstructions": null,
      "copyrightNotice": null,
      "questionCardinality": null,
      "answerCardinality": null,
      "question": "Bdy height",
      "answers": null,
      "skipLogic": null,
      "restrictions": null,
      "editable": null,
      "defaultAnswer": null,
      "formatting": null,
      "calculationMethod": null,
      "items": null
    },
    {
      "questionCode": "8306-3",
      "localQuestionCode": null,
      "dataType": null,
      "header": false,
      "units": [
        {
          "name": "[in_us]",
          "default": true,
          "normalRange": null,
          "absoluteRange": null
        },
        {
          "name": "cm",
          "default": false,
          "normalRange": null,
          "absoluteRange": null
        }
      ],
      "codingInstructions": null,
      "copyrightNotice": null,
      "questionCardinality": null,
      "answerCardinality": null,
      "question": "Bdy height lying",
      "answers": null,
      "skipLogic": null,
      "restrictions": null,
      "editable": null,
      "defaultAnswer": null,
      "formatting": null,
      "calculationMethod": null,
      "items": null
    },
    {
      "questionCode": "8310-5",
      "localQuestionCode": null,
      "dataType": "REAL",
      "header": false,
      "units": [
        {
          "name": "Cel",
          "default": false,
          "normalRange": null,
          "absoluteRange": null
        }
      ],
      "codingInstructions": null,
      "copyrightNotice": null,
      "questionCardinality": null,
      "answerCardinality": null,
      "question": "Body temperature",
      "answers": null,
      "skipLogic": null,
      "restrictions": null,
      "editable": null,
      "defaultAnswer": null,
      "formatting": null,
      "calculationMethod": null,
      "items": null
    },
    {
      "questionCode": "8462-4",
      "localQuestionCode": null,
      "dataType": null,
      "header": false,
      "units": [
        {
          "name": "mm[Hg]",
          "default": false,
          "normalRange": null,
          "absoluteRange": null
        }
      ],
      "codingInstructions": null,
      "copyrightNotice": null,
      "questionCardinality": null,
      "answerCardinality": null,
      "question": "BP dias",
      "answers": null,
      "skipLogic": null,
      "restrictions": null,
      "editable": null,
      "defaultAnswer": null,
      "formatting": null,
      "calculationMethod": null,
      "items": null
    },
    {
      "questionCode": "8480-6",
      "localQuestionCode": null,
      "dataType": null,
      "header": false,
      "units": [
        {
          "name": "mm[Hg]",
          "default": false,
          "normalRange": null,
          "absoluteRange": null
        }
      ],
      "codingInstructions": null,
      "copyrightNotice": null,
      "questionCardinality": null,
      "answerCardinality": null,
      "question": "BP sys",
      "answers": null,
      "skipLogic": null,
      "restrictions": null,
      "editable": null,
      "defaultAnswer": null,
      "formatting": null,
      "calculationMethod": null,
      "items": null
    },
    {
      "questionCode": "8867-4",
      "localQuestionCode": null,
      "dataType": null,
      "header": false,
      "units": [
        {
          "name": "{beats}/min",
          "default": false,
          "normalRange": null,
          "absoluteRange": null
        }
      ],
      "codingInstructions": null,
      "copyrightNotice": null,
      "questionCardinality": null,
      "answerCardinality": null,
      "question": "Heart rate",
      "answers": null,
      "skipLogic": null,
      "restrictions": null,
      "editable": null,
      "defaultAnswer": null,
      "formatting": null,
      "calculationMethod": null,
      "items": null
    },
    {
      "questionCode": "9279-1",
      "localQuestionCode": null,
      "dataType": null,
      "header": false,
      "units": [
        {
          "name": "{breaths}/min",
          "default": false,
          "normalRange": null,
          "absoluteRange": null
        }
      ],
      "codingInstructions": null,
      "copyrightNotice": null,
      "questionCardinality": null,
      "answerCardinality": null,
      "question": "Resp rate",
      "answers": null,
      "skipLogic": null,
      "restrictions": null,
      "editable": null,
      "defaultAnswer": null,
      "formatting": null,
      "calculationMethod": null,
      "items": null
    },
    {
      "questionCode": "3140-1",
      "localQuestionCode": null,
      "dataType": null,
      "header": false,
      "units": [
        {
          "name": "m2",
          "default": false,
          "normalRange": null,
          "absoluteRange": null
        }
      ],
      "codingInstructions": null,
      "copyrightNotice": null,
      "questionCardinality": null,
      "answerCardinality": null,
      "question": "BSA Derived",
      "answers": null,
      "skipLogic": null,
      "restrictions": null,
      "editable": null,
      "defaultAnswer": null,
      "formatting": null,
      "calculationMethod": null,
      "items": null
    },
    {
      "questionCode": "39156-5",
      "localQuestionCode": null,
      "dataType": null,
      "header": false,
      "units": [
        {
          "name": "kg/m2",
          "default": false,
          "normalRange": null,
          "absoluteRange": null
        }
      ],
      "codingInstructions": null,
      "copyrightNotice": null,
      "questionCardinality": null,
      "answerCardinality": null,
      "question": "BMI",
      "answers": null,
      "skipLogic": null,
      "restrictions": null,
      "editable": null,
      "defaultAnswer": null,
      "formatting": null,
      "calculationMethod":{"name":"BMI","value":["3141-9","8302-2"]},
      "items": null
    }
  ]
};