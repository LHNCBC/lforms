let Utils = {

  /**
   * Check if two answers can be treated as same
   * @param answer an answer item that could have part of the attributes set
   * @param completeAnswer an answer in the answer list that usually has more attributes set
   * @param item the lforms item that has the completeAnswer in the answer list
   * @private
   */
  areTwoAnswersSame(answer, completeAnswer, item) {

    let standardAnswerAttr = ['label', 'code', 'text', 'score', 'other'];
    //let standardAnswerAttr = ['label', 'code', '_displayText', 'score', 'other'];

    // answer in LForms might not have a codeSystem, check item.answerCodeSystem and form's codeSystem
    let completeAnswerCodeSystem = completeAnswer.system ? completeAnswer.system : item.answerCodeSystem;

    // check answers' attributes if they have the same code system
    let same = false;
    // if no code system or same code system
    if (!answer.system && !completeAnswer.system ||
        answer.system === completeAnswerCodeSystem) {
      // check all fields in answer
      same = true;
      let fields = Object.keys(answer);
      for (var i= 0, iLen=fields.length; i<iLen; i++) {
        // not to check extra attributes not specified in specs.
        if (standardAnswerAttr.indexOf(fields[i]) >= 0 && answer[fields[i]] !== completeAnswer[fields[i]]) {
          same = false;
          break;
        }
      }
    }
    return same;
  }



}

export default Utils;
