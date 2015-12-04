// Objects on the "Full Featured Form"
var FormWithUserData = function() {

  return {
    q1: element(by.id('/q1/1')),
    q2: element(by.id('/q2/1')),
    q3: element(by.id('/q3/1')),
    q4: element(by.id('/q4/1')),
    q5: element(by.id('/q5/1')),
    q6: element(by.id('/q6/1')),
    q7: element(by.id('/q7/1')),
    q8: element(by.id('/q8/1')),
    q9: element(by.id('/q9/1')),

    multiAnswers: element.all(by.css('.autocomp_selected li')),

    src: element(by.id('/slSource1/1')),
    t1: element(by.id('/slTargetItem1/1')),
    t2: element(by.id('/slTargetItem2/1')),
    t4: element(by.id('/slTargetHeader1/slTargetSubItem1/1/1')),
    t5: element(by.id('/slTargetHeader1/slTargetSubItem2/1/1')),

    rpq1_1: element(by.id('/rp-q1/1')),
    rpq1_2: element(by.id('/rp-q1/2')),
    rpq1_3: element(by.id('/rp-q1/3')),
    rpq1_add_btn: element(by.id('add-/rp-q1/2')),
    rpq1_add_btn_3: element(by.id('add-/rp-q1/3')),

    rpq2_1: element(by.id('/rp-q2/1')),
    rpq2_2: element(by.id('/rp-q2/2')),

    rpq3_1: element(by.id('/rp-q2/rp-q3/1/1')),
    rpq3_2: element(by.id('/rp-q2/rp-q3/2/1')),

    rpq4_1: element(by.id('/rp-q2/rp-q4/1/1')),
    rpq4_2: element(by.id('/rp-q2/rp-q4/1/2')),
    rpq4_3: element(by.id('/rp-q2/rp-q4/1/3')),
    rpq4_4: element(by.id('/rp-q2/rp-q4/1/4')),
    rpq4_5: element(by.id('/rp-q2/rp-q4/2/1')),

    rpq5_1: element(by.id('/rp-q2/rp-q4/rp-q5/1/1/1')),
    rpq5_2: element(by.id('/rp-q2/rp-q4/rp-q5/1/2/1')),
    rpq5_3: element(by.id('/rp-q2/rp-q4/rp-q5/1/3/1')),
    rpq5_4: element(by.id('/rp-q2/rp-q4/rp-q5/1/4/1')),
    rpq5_5: element(by.id('/rp-q2/rp-q4/rp-q5/2/1/1')),

    rpq4_add_btn_1: element(by.id('add-/rp-q2/rp-q4/1/3')),
    rpq4_add_btn_1b: element(by.id('add-/rp-q2/rp-q4/1/4')),
    rpq4_add_btn_2: element(by.id('add-/rp-q2/rp-q4/2/1')),
    rpq4_del_btn_1: element(by.id('del-/rp-q2/rp-q4/1/1')),
    rpq4_del_btn_2: element(by.id('del-/rp-q2/rp-q4/1/2')),
    rpq4_del_btn_3: element(by.id('del-/rp-q2/rp-q4/1/3')),

    rpq2_add_btn: element(by.id('add-/rp-q2/2')),
    rqp2_del_btn_1: element(by.id('del-/rp-q2/1')),
    rqp2_del_btn_2: element(by.id('del-/rp-q2/2')),

    rpSrc2: element(by.id('/rpSource2/1')),
    rpTarget2a: element(by.id('/repeatingSection1/rpTargetItem2/1/1')),
    rpTarget2b: element(by.id('/repeatingSection1/rpTargetItem2/2/1')),
    rpAdd: element(by.id('add-/repeatingSection1/1')),

    formSearch: element(by.css('#s2id_loinc_num1 a')),
    formShow: element(by.css('.btn')),

    /**
     *  Opens the "full featured" form.
     */
    openFormWithUserData: function() {
      browser.get('http://0.0.0.0:9001/');
      this.formSearch.click();
      $('.select2-result:nth-of-type(8)').click();
      this.formShow.click();
    }

  }

};

module.exports = FormWithUserData();
