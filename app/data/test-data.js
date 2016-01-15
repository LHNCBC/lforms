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
  template: "form-view-a",
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
            },
          ]
        },
      ]
    },
    // level 1, continue
    {"questionCode": "54114-4", "parentQuestionCode": "", "questionCardinality": {"min": "1", "max": "*"}, "question": "Family member health information", "answers": "", "dataType": "", "units": "", "header": true,
      // level 2
      "items": [
        {"questionCode": "54136-7", "questionCardinality": {"min": "1", "max": "1"}, "question": "Relationship to you", "answers": 621, "dataType": "CNE", "units": "", "header": false},
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
            },
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
            {"questionCode": "39156-5", "questionCardinality": {"min": "1", "max": "1"}, "question": "Mock-up item: Body mass index (BMI) [Ratio]", "answers": "", "dataType": "", "units": "", "header": false, "calculationMethod":{"name":"BMI","value":["29463-7","8302-2"]}},
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
        },
      ]
    },
    // level 1, continue
    {"questionCode": "54114-4", "parentQuestionCode": "", "questionCardinality": {"min": "1", "max": "*"}, "question": "Family member health information", "answers": "", "dataType": "", "units": "", "header": true,
      // level 2
      "items": [
        {"questionCode": "54136-7", "questionCardinality": {"min": "1", "max": "1"}, "question": "Relationship to you", "answers": 621, "dataType": "CNE", "units": "", "header": false},
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
            },
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
            {"questionCode": "39156-5", "questionCardinality": {"min": "1", "max": "1"}, "question": "Mock-up item: Body mass index (BMI) [Ratio]", "answers": "", "dataType": "", "units": "", "header": false, "calculationMethod":{"name":"BMI","value":["29463-7","8302-2"]}},
          ]
        },
        {"questionCode": "54119-3R", "questionCardinality": {"min": "1", "max": "1"}, "question": "Race", "answerCardinality": {"min": "0", "max": "*"}, "answers": 629, "dataType": "CNE", "units": "", "header": false},
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
  "codingInstructions": "NIH/NLM/LHNCBC",
  "copyrightNotice": null,
  "items": [
    // different data type
    {"questionCode": "type0", "dataType": "", "header": false, "units": null, "codingInstructions": null,
      "questionCardinality": null, "answerCardinality": null, "question": "With empty data type", "answers": null,
      "skipLogic": null, "editable": null, "defaultAnswer": null, "formatting": null, "calculationMethod": null, "items": null},
    {"questionCode": "type1", "dataType": "BL", "header": false, "units": null, "codingInstructions": null,
      "questionCardinality": null, "answerCardinality": null, "question": "With data type BL", "answers": null,
      "skipLogic": null, "editable": null, "defaultAnswer": null, "formatting": null, "calculationMethod": null, "items": null},
    {"questionCode": "type2", "dataType": "INT", "header": false, "units": null, "codingInstructions": null,
      "questionCardinality": null, "answerCardinality": null, "question": "With data type INT", "answers": null,
      "skipLogic": null, "editable": null, "defaultAnswer": null, "formatting": null, "calculationMethod": null, "items": null},
    {"questionCode": "type3", "dataType": "REAL", "header": false, "units": null, "codingInstructions": null,
      "questionCardinality": null, "answerCardinality": null, "question": "With data type REAL", "answers": null,
      "skipLogic": null, "editable": null, "defaultAnswer": null, "formatting": null, "calculationMethod": null, "items": null},
    {"questionCode": "type4", "dataType": "ST", "header": false, "units": null, "codingInstructions": null,
      "questionCardinality": null, "answerCardinality": null, "question": "With data type ST", "answers": null,
      "skipLogic": null, "editable": null, "defaultAnswer": null, "formatting": null, "calculationMethod": null, "items": null},
    {"questionCode": "type5", "dataType": "BIN", "header": false, "units": null, "codingInstructions": null,
      "questionCardinality": null, "answerCardinality": null, "question": "With data type BIN", "answers": null,
      "skipLogic": null, "editable": null, "defaultAnswer": null, "formatting": null, "calculationMethod": null, "items": null},
    {"questionCode": "type6", "dataType": "DT", "header": false, "units": null, "codingInstructions": null,
      "questionCardinality": null, "answerCardinality": null, "question": "With data type DT", "answers": null,
      "skipLogic": null, "editable": null, "defaultAnswer": null, "formatting": null, "calculationMethod": null, "items": null},
    {"questionCode": "type7", "dataType": "DTM", "header": false, "units": null, "codingInstructions": null,
      "questionCardinality": null, "answerCardinality": null, "question": "With data type DTM", "answers": null,
      "skipLogic": null, "editable": null, "defaultAnswer": null, "formatting": null, "calculationMethod": null, "items": null},
    {"questionCode": "type8", "dataType": "TM", "header": false, "units": null, "codingInstructions": null,
      "questionCardinality": null, "answerCardinality": null, "question": "With data type TM", "answers": null,
      "skipLogic": null, "editable": null, "defaultAnswer": null, "formatting": null, "calculationMethod": null, "items": null},
    {"questionCode": "type9", "dataType": "CNE", "header": false, "units": null, "codingInstructions": null,
      "questionCardinality": null, "answerCardinality": null, "question": "With data type CNE", "answers": [
      {"code": "c1", "text": "Answer 1", "other": null},
      {"code": "c2", "text": "Answer 2", "other": null},
      {"code": "c3", "text": "Answer 3", "other": null},
      {"code": "c4", "text": "Other:", "other": true}],
      "skipLogic": null, "editable": null, "defaultAnswer": 'Answer 2', "formatting": null, "calculationMethod": null, "items": null},
    {"questionCode": "type10", "dataType": "CWE", "header": false, "units": null, "codingInstructions": null,
      "questionCardinality": null, "answerCardinality": null, "question": "With data type CWE", "answers": [
      {"label": "1", "code": "c01", "text": "With a label 1", "score": 1, "other": null},
      {"label": "2", "code": "c02", "text": "With a label 2", "score": 2, "other": null},
      {"label": "3", "code": "c03", "text": "With a label 3", "score": 3, "other": null}],
      "skipLogic": null, "editable": null, "defaultAnswer": null, "formatting": null, "calculationMethod": null, "items": null},
    {"questionCode": "type11", "dataType": "RTO", "header": false, "units": null, "codingInstructions": null,
      "questionCardinality": null, "answerCardinality": null, "question": "With data type RTO", "answers": null,
      "skipLogic": null, "editable": null, "defaultAnswer": null, "formatting": null, "calculationMethod": null, "items": null},
    {"questionCode": "type12", "dataType": "QTY", "header": false, "units": null, "codingInstructions": null,
      "questionCardinality": null, "answerCardinality": null, "question": "With data type QTY", "answers": null,
      "skipLogic": null, "editable": null, "defaultAnswer": null, "formatting": null, "calculationMethod": null, "items": null},
    {"questionCode": "type13", "dataType": "YEAR", "header": false, "units": null, "codingInstructions": null,
      "questionCardinality": null, "answerCardinality": null, "question": "With data type YEAR", "answers": null,
      "skipLogic": null, "editable": null, "defaultAnswer": null, "formatting": null, "calculationMethod": null, "items": null},
    {"questionCode": "type14", "dataType": "MONTH", "header": false, "units": null, "codingInstructions": null,
      "questionCardinality": null, "answerCardinality": null, "question": "With data type MONTH", "answers": null,
      "skipLogic": null, "editable": null, "defaultAnswer": null, "formatting": null, "calculationMethod": null, "items": null},
    {"questionCode": "type15", "dataType": "DAY", "header": false, "units": null, "codingInstructions": null,
      "questionCardinality": null, "answerCardinality": null, "question": "With data type DAY", "answers": null,
      "skipLogic": null, "editable": null, "defaultAnswer": null, "formatting": null, "calculationMethod": null, "items": null},
    {"questionCode": "type16", "dataType": "URL", "header": false, "units": null, "codingInstructions": null,
      "questionCardinality": null, "answerCardinality": null, "question": "With data type URL", "answers": null,
      "skipLogic": null, "editable": null, "defaultAnswer": null, "formatting": null, "calculationMethod": null, "items": null},
    {"questionCode": "type17", "dataType": "EMAIL", "header": false, "units": null, "codingInstructions": null,
      "questionCardinality": null, "answerCardinality": null, "question": "With data type EMAIL", "answers": null,
      "skipLogic": null, "editable": null, "defaultAnswer": null, "formatting": null, "calculationMethod": null, "items": null},
    {"questionCode": "type18", "dataType": "PHONE", "header": false, "units": null, "codingInstructions": null,
      "questionCardinality": null, "answerCardinality": null, "question": "With data type PHONE", "answers": null,
      "skipLogic": null, "editable": null, "defaultAnswer": null, "formatting": null, "calculationMethod": null, "items": null},

    // multi-select CNE
    {"questionCode": "multiSelectCNE", "dataType": "CNE", "header": false, "units": null, "codingInstructions": null,
      "questionCardinality": null, "answerCardinality": {"min": "0", "max": "*"}, "question": "Multi Selection on CNE", "answers": [
      {"code": "c1", "text": "Answer 1"},
      {"code": "c2", "text": "Answer 2"},
      {"code": "c3", "text": "Answer 3"},
      {"code": "c4", "text": "Answer 4"}],
      "skipLogic": null, "editable": null, "defaultAnswer": null, "formatting": null, "calculationMethod": null, "items": null},
    // multi-select CWE
    {"questionCode": "multiSelectCWE", "dataType": "CWE", "header": false, "units": null, "codingInstructions": null,
      "questionCardinality": null, "answerCardinality": {"min": "0", "max": "*"}, "question": "Multi Selection on CWE", "answers": [
      {"code": "c1", "text": "Answer 1"},
      {"code": "c2", "text": "Answer 2"},
      {"code": "c3", "text": "Answer 3"},
      {"code": "c4", "text": "Answer 4"}],
      "skipLogic": null, "editable": null, "defaultAnswer": null, "formatting": null, "calculationMethod": null, "items": null},


    // skip logic, controlling sibling items
    // skip logic, controlling sibling headers
    {"questionCode": "slSource1", "dataType": "INT", "header": false, "units": null, "codingInstructions": "1 to show T1; >=2 to show T2; <=5 to show header T3, and its subitmes T4 and T5.",
      "questionCardinality": null, "answerCardinality": null, "question": "Skip Logic Source #1", "answers": null,
      "editable": null, "defaultAnswer": null, "formatting": null, "calculationMethod": null, "items": null},
    {"questionCode": "slTargetItem1", "dataType": "INT", "header": false, "units": null, "codingInstructions": null,
      "questionCardinality": null, "answerCardinality": null, "question": "T1: Shown when 'Skip Logic Source #1' == 1", "answers": null,
      "skipLogic": {"conditions":[{"source": "slSource1", "trigger": {"value": 1}}],
        "action": "show"},
      "editable": null, "defaultAnswer": null, "formatting": null, "calculationMethod": null, "items": null},
    {"questionCode": "slTargetItem2", "dataType": "INT", "header": false, "units": null, "codingInstructions": null,
      "questionCardinality": null, "answerCardinality": null, "question": "T2: Shown when 'Skip Logic Source #1' > 1", "answers": null,
      "skipLogic": {"conditions":[{"source": "slSource1", "trigger": {"minInclusive": 2}}],
        "action": "show"},
      "editable": null, "defaultAnswer": null, "formatting": null, "calculationMethod": null, "items": null},
    {"questionCode": "slTargetHeader1", "dataType": "", "header": true, "units": null, "codingInstructions": null,
      "questionCardinality": null, "answerCardinality": null, "question": "T3: Shown when 'Skip Logic Source #1' <= 5", "answers": null,
      "skipLogic": {"conditions":[{"source": "slSource1", "trigger": {"maxInclusive": 5}}],
        "action": "show"},
      "editable": null, "defaultAnswer": null, "formatting": null, "calculationMethod": null, "items": null,
      "items": [
        {"questionCode": "slTargetSubItem1", "dataType": "INT", "header": false, "units": null, "codingInstructions": null,
          "questionCardinality": null, "answerCardinality": null, "question": "T4: Shown when my section header is shown", "answers": null,
          "skipLogic": null, "editable": null, "defaultAnswer": null, "formatting": null, "calculationMethod": null, "items": null},
        {"questionCode": "slTargetSubItem2","dataType": "INT", "header": false, "units": null, "codingInstructions": null,
          "questionCardinality": null, "answerCardinality": null, "question": "T5: Shown when my section header is shown", "answers": null,
          "skipLogic": null, "editable": null, "defaultAnswer": null, "formatting": null, "calculationMethod": null, "items": null},
      ]
    },


    // skip logic, with logic ALL
    {"questionCode": "slALLSource1", "dataType": "INT", "header": false, "units": null, "questionCardinality": null, "answerCardinality": null, "question": "Source #1 (ALL)", "answers": null,
      "editable": null, "defaultAnswer": null, "formatting": null, "calculationMethod": null, "items": null},
    {"questionCode": "slALLSource2", "dataType": "INT", "header": false, "units": null, "questionCardinality": null, "answerCardinality": null, "question": "Source #2 (ALL)", "answers": null,
      "editable": null, "defaultAnswer": null, "formatting": null, "calculationMethod": null, "items": null},
    {"questionCode": "slALLTargetItem", "dataType": "INT", "header": false, "units": null, "codingInstructions": null,
      "questionCardinality": null, "answerCardinality": null, "question": "Shown when 'Source #1 (ALL)' == 1 AND Shown when 'Source #2 (ALL)' == 2 ", "answers": null,
      "skipLogic": {"conditions":[{"source": "slALLSource1", "trigger": {"value": 1}}, {"source": "slALLSource2", "trigger": {"value": 2}}],
        "action": "show", "logic": "ALL"},
      "editable": null, "defaultAnswer": null, "formatting": null, "calculationMethod": null, "items": null},

    // skip logic, with logic ANY
    {"questionCode": "slANYSource1", "dataType": "INT", "header": false, "units": null, "questionCardinality": null, "answerCardinality": null, "question": "Source #1 (ANY)", "answers": null,
      "editable": null, "defaultAnswer": null, "formatting": null, "calculationMethod": null, "items": null},
    {"questionCode": "slANYSource2", "dataType": "INT", "header": false, "units": null, "questionCardinality": null, "answerCardinality": null, "question": "Source #2 (ANY)", "answers": null,
      "editable": null, "defaultAnswer": null, "formatting": null, "calculationMethod": null, "items": null},
    {"questionCode": "slANYTargetItem", "dataType": "INT", "header": false, "units": null, "codingInstructions": null,
      "questionCardinality": null, "answerCardinality": null, "question": "Shown when 'Source #1 (ANY)' == 1 OR Shown when 'Source #2 (ANY)' == 2 ", "answers": null,
      "skipLogic": {"conditions":[{"source": "slANYSource1", "trigger": {"value": 1}}, {"source": "slANYSource2", "trigger": {"value": 2}}],
        "action": "show", "logic": "ANY"},
      "editable": null, "defaultAnswer": null, "formatting": null, "calculationMethod": null, "items": null},

    // skip logic, within a repeating section
    {"questionCode": "rpSource2", "dataType": "INT", "header": false, "units": null, "codingInstructions": "2 to show T2",
      "questionCardinality": null, "answerCardinality": null, "question": "Skip Logic Source (repeating) #2", "answers": null,
      "editable": null, "defaultAnswer": null, "formatting": null, "calculationMethod": null, "items": null},
    {"questionCode": "repeatingSection1", "header": true, "question": "A Repeating Section","questionCardinality":{"max": "*", "min": "1"},
      "items": [
        {"questionCode": "rpSource1", "dataType": "INT", "header": false, "units": null, "codingInstructions": "1 to show T1; <=5 to show header T3, and its subitem T4.",
          "questionCardinality": null, "answerCardinality": null, "question": "Skip Logic Source (repeating) #1", "answers": null,
          "editable": null, "defaultAnswer": null, "formatting": null, "calculationMethod": null, "items": null},
        {"questionCode": "rpTargetItem1", "dataType": "INT", "header": false, "units": null, "codingInstructions": null,
          "questionCardinality": null, "answerCardinality": null, "question": "T1: Shown when 'Skip Logic Source (repeating) #1' == 1", "answers": null,
          "skipLogic": {"conditions":[{"source": "rpSource1", "trigger": {"value": 1}}],
            "action": "show"},
          "editable": null, "defaultAnswer": null, "formatting": null, "calculationMethod": null, "items": null},
        {"questionCode": "rpTargetItem2", "dataType": "INT", "header": false, "units": null, "codingInstructions": null,
          "questionCardinality": null, "answerCardinality": null, "question": "T2: Shown when 'Skip Logic Source (repeating) #2' == 2", "answers": null,
          "skipLogic": {"conditions":[{"source": "rpSource2", "trigger": {"value": 2}}],
            "action": "show"},
          "editable": null, "defaultAnswer": null, "formatting": null, "calculationMethod": null, "items": null},
        {"questionCode": "rpTargetHeader1", "dataType": "", "header": true, "units": null, "codingInstructions": null,
          "questionCardinality": null, "answerCardinality": null, "question": "T3: Shown when 'Skip Logic Source (repeating) #1' <= 5", "answers": null,
          "skipLogic": {"conditions":[{"source": "rpSource1", "trigger": {"maxInclusive": 5}}],
            "action": "show"},
          "editable": null, "defaultAnswer": null, "formatting": null, "calculationMethod": null, "items": null,
          "items": [
            {"questionCode": "rpTargetSubItem1", "dataType": "INT", "header": false, "units": null, "codingInstructions": null,
              "questionCardinality": null, "answerCardinality": null, "question": "T4: Shown when my section header is shown", "answers": null,
              "skipLogic": null, "editable": null, "defaultAnswer": null, "formatting": null, "calculationMethod": null, "items": null}
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
          "externallyDefined":"https://lforms-service.nlm.nih.gov/rxterms?ef=STRENGTHS_AND_FORMS,RXCUIS",
          //https://lforms-service.nlm.nih.gov/rxterms?terms=arava&ef=STRENGTHS_AND_FORMS&autocomp=1
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
                "sourceType": "internal",
                "dataType": "LIST", // "TEXT", "NUMBER" ?
                "itemCode": "itemWithExtraData",
                //"property": "value.STRENGTHS_AND_FORMS"
                "data": {"code": "value.RXCUIS", "text": "value.STRENGTHS_AND_FORMS"}  // for "LIST"
                // "data": "value.STRENGTHS_AND_FORMS" // for other dataType
              },
              "onAttribute": "answers"
            }
          ],
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
                "sourceType": "internal",
                "dataType": "TEXT",
                "itemCode": "itemWithExtraData",
                // "data": {"code": "value.RXCUIS", "text": "value.STRENGTHS_AND_FORMS"}  // for "LIST"
                "data": "value.STRENGTHS_AND_FORMS.[0]"
              },
              "onAttribute": "value"
            }
          ],
        },

        ////an item that gets the external LIST data whenever the source item has a data changes
        //{
        //  "questionCode": "controlledItemTestURL_LIST",
        //  "dataType": "CNE",
        //  "header": false,
        //  "question": "A Strength List (Through URL)",
        //  "dataControl": [
        //    {
        //      "source": {
        //        "sourceType": "external",
        //        "dataType": "LIST",
        //        "itemCode": "itemWithExtraData",
        //        "url": "https://lforms-service.nlm.nih.gov/rxterms?ef=STRENGTHS_AND_FORMS,RXCUIS&authenticity_token=&autocomp=1",
        //        "urlOptions": [{"parameter": "terms", "data": "value.text"}],
        //        "data": {"code": "value.RXCUIS", "text": "value.STRENGTHS_AND_FORMS"}  // for "LIST"
        //      },
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
        //        "sourceType": "external",
        //        "dataType": "TEXT",
        //        "itemCode": "itemWithExtraData",
        //        "url": "https://lforms-service.nlm.nih.gov/rxterms?ef=STRENGTHS_AND_FORMS,RXCUIS&authenticity_token=&autocomp=1",
        //        "urlOptions": [{"parameter": "terms", "data": "value.text"}],
        //        "data": "value.STRENGTHS_AND_FORMS.[0]"
        //      },
        //      "onAttribute": "value"
        //    }
        //  ],
        //}
      ]

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
    {"questionCode": "q1", "header": false, "units": null, "codingInstructions": null, "value": "no data type",
      "questionCardinality": null, "answerCardinality": null, "question": "With no data type", "answers": null,
      "skipLogic": null, "editable": null, "defaultAnswer": null, "formatting": null, "calculationMethod": null, "items": null},
    {"questionCode": "q2", "dataType": "INT", "header": false, "units": null, "codingInstructions": null, "value": 100,
      "questionCardinality": null, "answerCardinality": null, "question": "With data type INT", "answers": null,
      "skipLogic": null, "editable": null, "defaultAnswer": null, "formatting": null, "calculationMethod": null, "items": null},
    {"questionCode": "q3", "dataType": "ST", "header": false, "units": null, "codingInstructions": null, "value": "user input value",
      "questionCardinality": null, "answerCardinality": null, "question": "With data type ST", "answers": null,
      "skipLogic": null, "editable": null, "defaultAnswer": null, "formatting": null, "calculationMethod": null, "items": null},
    {"questionCode": "q4", "dataType": "DT", "header": false, "units": null, "codingInstructions": null, "value": "Wed Nov 17 2015 00:00:00 GMT-0500 (EST)",
      "questionCardinality": null, "answerCardinality": null, "question": "With data type DT", "answers": null,
      "skipLogic": null, "editable": null, "defaultAnswer": null, "formatting": null, "calculationMethod": null, "items": null},
    // answer list, default answer
    {"questionCode": "q5", "dataType": "CNE", "header": false, "units": null, "codingInstructions": null,
      "questionCardinality": null, "answerCardinality": null, "question": "With data type CNE, default value", "answers": [
      {"code": "c1", "text": "Answer 1", "other": null},
      {"code": "c2", "text": "Answer 2", "other": null},
      {"code": "c3", "text": "Answer 3", "other": null},
      {"code": "c4", "text": "Other:", "other": true}],
      "skipLogic": null, "editable": null, "defaultAnswer": 'Answer 2', "formatting": null, "calculationMethod": null, "items": null},
    // answer list, user selected value
    {"questionCode": "q6", "dataType": "CNE", "header": false, "units": null, "codingInstructions": null, "value": {"code": "c1", "text": "Answer 1", "other": null},
      "questionCardinality": null, "answerCardinality": null, "question": "With data type CNE, user value", "answers": [
      {"code": "c1", "text": "Answer 1", "other": null},
      {"code": "c2", "text": "Answer 2", "other": null},
      {"code": "c3", "text": "Answer 3", "other": null},
      {"code": "c4", "text": "Other:", "other": true}],
      "skipLogic": null, "editable": null, "formatting": null, "calculationMethod": null, "items": null},
    // answer list, user selected value overrides default answer
    {"questionCode": "q7", "dataType": "CNE", "header": false, "units": null, "codingInstructions": null, "value": {"code": "c3", "text": "Answer 3", "other": null},
      "questionCardinality": null, "answerCardinality": null, "question": "With data type CNE, user value over default value", "answers": [
      {"code": "c1", "text": "Answer 1", "other": null},
      {"code": "c2", "text": "Answer 2", "other": null},
      {"code": "c3", "text": "Answer 3", "other": null},
      {"code": "c4", "text": "Other:", "other": true}],
      "skipLogic": null, "editable": null, "defaultAnswer": 'Answer 2', "formatting": null, "calculationMethod": null, "items": null},

    // multi-select CNE
    {"questionCode": "q8", "dataType": "CNE", "header": false, "units": null, "codingInstructions": null, "value": [{"code": "c1", "text": "Answer 1"},{"code": "c3", "text": "Answer 3"}],
      "questionCardinality": null, "answerCardinality": {"min": "0", "max": "*"}, "question": "Multi Selection on CNE", "answers": [
      {"code": "c1", "text": "Answer 1"},
      {"code": "c2", "text": "Answer 2"},
      {"code": "c3", "text": "Answer 3"},
      {"code": "c4", "text": "Answer 4"}],
      "skipLogic": null, "editable": null, "defaultAnswer": null, "formatting": null, "calculationMethod": null, "items": null},
    // multi-select CWE
    {"questionCode": "q9", "dataType": "CWE", "header": false, "units": null, "codingInstructions": null, "value": [{"code": "c2", "text": "Answer 2"},{"text": "User created answer"}],
      "questionCardinality": null, "answerCardinality": {"min": "0", "max": "*"}, "question": "Multi Selection on CWE", "answers": [
      {"code": "c1", "text": "Answer 1"},
      {"code": "c2", "text": "Answer 2"},
      {"code": "c3", "text": "Answer 3"},
      {"code": "c4", "text": "Answer 4"}],
      "skipLogic": null, "editable": null, "defaultAnswer": null, "formatting": null, "calculationMethod": null, "items": null},

    // skip logic works
    {"questionCode": "slSource1", "dataType": "INT", "header": false, "units": null, "value": 2, "codingInstructions": "1 to show T1; >=2 to show T2; <=5 to show header T3, and its subitmes T4 and T5.",
      "questionCardinality": null, "answerCardinality": null, "question": "Skip Logic Source #1", "answers": null,
      "editable": null, "defaultAnswer": null, "formatting": null, "calculationMethod": null, "items": null},
      // hidden
    {"questionCode": "slTargetItem1", "dataType": "INT", "header": false, "units": null, "codingInstructions": null,
      "questionCardinality": null, "answerCardinality": null, "question": "T1: Shown when 'Skip Logic Source #1' == 1", "answers": null,
      "skipLogic": {"conditions":[{"source": "slSource1", "trigger": {"value": 1}}],
        "action": "show"},
      "editable": null, "defaultAnswer": null, "formatting": null, "calculationMethod": null, "items": null},
      // shown, with user value
    {"questionCode": "slTargetItem2", "dataType": "INT", "header": false, "units": null, "codingInstructions": null, "value": 200,
      "questionCardinality": null, "answerCardinality": null, "question": "T2: Shown when 'Skip Logic Source #1' > 1", "answers": null,
      "skipLogic": {"conditions":[{"source": "slSource1", "trigger": {"minInclusive": 2}}],
        "action": "show"},
      "editable": null, "defaultAnswer": null, "formatting": null, "calculationMethod": null, "items": null},
      // shown
    {"questionCode": "slTargetHeader1", "dataType": "", "header": true, "units": null, "codingInstructions": null,
      "questionCardinality": null, "answerCardinality": null, "question": "T3: Shown when 'Skip Logic Source #1' <= 5", "answers": null,
      "skipLogic": {"conditions":[{"source": "slSource1", "trigger": {"maxInclusive": 5}}],
        "action": "show"},
      "editable": null, "defaultAnswer": null, "formatting": null, "calculationMethod": null, "items": null,
      "items": [
          // shown, with user value
        {"questionCode": "slTargetSubItem1", "dataType": "INT", "header": false, "units": null, "codingInstructions": null, "value": 201,
          "questionCardinality": null, "answerCardinality": null, "question": "T4: Shown when my section header is shown", "answers": null,
          "skipLogic": null, "editable": null, "defaultAnswer": null, "formatting": null, "calculationMethod": null, "items": null},
          // shown, with user value
        {"questionCode": "slTargetSubItem2","dataType": "INT", "header": false, "units": null, "codingInstructions": null, "value": 202,
          "questionCardinality": null, "answerCardinality": null, "question": "T5: Shown when my section header is shown", "answers": null,
          "skipLogic": null, "editable": null, "defaultAnswer": null, "formatting": null, "calculationMethod": null, "items": null},
      ]
    },

    // multiple instances of repeating items all shown
    {"questionCode": "rp-q1", "questionCardinality": {"min": "1", "max": "*"}, "question": "A Repeating Item", "value": "instance A"},
    {"questionCode": "rp-q1", "questionCardinality": {"min": "1", "max": "*"}, "question": "A Repeating Item", "value": "instance B"},

    {"questionCode": "rp-q2", "header": true, "question": "A Repeating Section","questionCardinality":{"max": "*", "min": "1"},
      "items": [
        {"questionCode": "rp-q3", "dataType": "INT", "header": false, "units": null, "value": 300,
          "questionCardinality": null, "answerCardinality": null, "question": "An item in a repeating section", "answers": null,
          "editable": null, "defaultAnswer": null, "formatting": null, "calculationMethod": null, "items": null},
        {"questionCode": "rp-q4", "dataType": "", "header": true, "questionCardinality":{"max": "*", "min": "1"},
          "answerCardinality": null, "question": "A repeating section in a repeating section",
          "editable": null, "defaultAnswer": null, "formatting": null, "calculationMethod": null,
          "items": [
            {"questionCode": "rp-q5", "dataType": "INT", "header": false, "units": null, "codingInstructions": null, "value": 400,
              "questionCardinality": null, "answerCardinality": null, "question": "A sub-sub item", "answers": null,
              "skipLogic": null, "editable": null, "defaultAnswer": null, "formatting": null, "calculationMethod": null, "items": null}
          ]
        },
        {"questionCode": "rp-q4", "dataType": "", "header": true, "questionCardinality":{"max": "*", "min": "1"},
          "answerCardinality": null, "question": "A repeating section in a repeating section",
          "editable": null, "defaultAnswer": null, "formatting": null, "calculationMethod": null,
          "items": [
            {"questionCode": "rp-q5", "dataType": "INT", "header": false, "units": null, "codingInstructions": null, "value": 401,
              "questionCardinality": null, "answerCardinality": null, "question": "A sub-sub item", "answers": null,
              "skipLogic": null, "editable": null, "defaultAnswer": null, "formatting": null, "calculationMethod": null, "items": null}
          ]
        },
        {"questionCode": "rp-q4", "dataType": "", "header": true, "questionCardinality":{"max": "*", "min": "1"},
          "answerCardinality": null, "question": "A repeating section in a repeating section",
          "editable": null, "defaultAnswer": null, "formatting": null, "calculationMethod": null,
          "items": [
            {"questionCode": "rp-q5", "dataType": "INT", "header": false, "units": null, "codingInstructions": null, "value": 402,
              "questionCardinality": null, "answerCardinality": null, "question": "A sub-sub item", "answers": null,
              "skipLogic": null, "editable": null, "defaultAnswer": null, "formatting": null, "calculationMethod": null, "items": null}
          ]
        },
      ]
    },
    {"questionCode": "rp-q2", "header": true, "question": "A Repeating Section","questionCardinality":{"max": "*", "min": "1"},
      "items": [
        {"questionCode": "rp-q3", "dataType": "INT", "header": false, "units": null, "value": 301,
          "questionCardinality": null, "answerCardinality": null, "question": "An item in a repeating section", "answers": null,
          "editable": null, "defaultAnswer": null, "formatting": null, "calculationMethod": null, "items": null},
        {"questionCode": "rp-q4", "dataType": "", "header": true, "questionCardinality":{"max": "*", "min": "1"},
          "answerCardinality": null, "question": "A repeating section in a repeating section",
          "editable": null, "defaultAnswer": null, "formatting": null, "calculationMethod": null,
          "items": [
            {"questionCode": "rp-q5", "dataType": "INT", "header": false, "units": null, "codingInstructions": null, "value": 403,
              "questionCardinality": null, "answerCardinality": null, "question": "A sub-sub item", "answers": null,
              "skipLogic": null, "editable": null, "defaultAnswer": null, "formatting": null, "calculationMethod": null, "items": null}
          ]
        }
      ]
    },


    // skip logic, within a repeating section, works
      // user value shown
    {"questionCode": "rpSource2", "dataType": "INT", "header": false, "units": null, "codingInstructions": "2 to show T2", "value": 2,
      "questionCardinality": null, "answerCardinality": null, "question": "Skip Logic Source (repeating) #2", "answers": null,
      "editable": null, "defaultAnswer": null, "formatting": null, "calculationMethod": null, "items": null},
    {"questionCode": "repeatingSection1", "header": true, "question": "A Repeating Section","questionCardinality":{"max": "*", "min": "1"},
      "items": [
          // user value shown
        {"questionCode": "rpSource1", "dataType": "INT", "header": false, "units": null, "value": 3, "codingInstructions": "1 to show T1; <=5 to show header T3, and its subitem T4.",
          "questionCardinality": null, "answerCardinality": null, "question": "Skip Logic Source (repeating) #1", "answers": null,
          "editable": null, "defaultAnswer": null, "formatting": null, "calculationMethod": null, "items": null},
          // hidden
        {"questionCode": "rpTargetItem1", "dataType": "INT", "header": false, "units": null, "codingInstructions": null,
          "questionCardinality": null, "answerCardinality": null, "question": "T1: Shown when 'Skip Logic Source (repeating) #1' == 1", "answers": null,
          "skipLogic": {"conditions":[{"source": "rpSource1", "trigger": {"value": 1}}],
            "action": "show"},
          "editable": null, "defaultAnswer": null, "formatting": null, "calculationMethod": null, "items": null},
          // shown
        {"questionCode": "rpTargetItem2", "dataType": "INT", "header": false, "units": null, "codingInstructions": null,
          "questionCardinality": null, "answerCardinality": null, "question": "T2: Shown when 'Skip Logic Source (repeating) #2' == 2", "answers": null,
          "skipLogic": {"conditions":[{"source": "rpSource2", "trigger": {"value": 2}}],
            "action": "show"},
          "editable": null, "defaultAnswer": null, "formatting": null, "calculationMethod": null, "items": null},
          // shown
        {"questionCode": "rpTargetHeader1", "dataType": "", "header": true, "units": null, "codingInstructions": null,
          "questionCardinality": null, "answerCardinality": null, "question": "T3: Shown when 'Skip Logic Source (repeating) #1' <= 5", "answers": null,
          "skipLogic": {"conditions":[{"source": "rpSource1", "trigger": {"maxInclusive": 5}}],
            "action": "show"},
          "editable": null, "defaultAnswer": null, "formatting": null, "calculationMethod": null, "items": null,
          "items": [
              // shown
            {"questionCode": "rpTargetSubItem1", "dataType": "INT", "header": false, "units": null, "codingInstructions": null,
              "questionCardinality": null, "answerCardinality": null, "question": "T4: Shown when my section header is shown", "answers": null,
              "skipLogic": null, "editable": null, "defaultAnswer": null, "formatting": null, "calculationMethod": null, "items": null}
          ]
        }
      ]
    }

  ]};
