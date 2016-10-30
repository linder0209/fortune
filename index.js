$(function () {
  $('#calculation').click(function () {
    //贷款金额
    var amount = $('#amount').val();
    //贷款年利率
    var loan = $('#loan').val();
    //贷款周期，多少月
    var month = $('#month').val();
    //投资年利率
    var invest = $('#invest').val();

    //[贷款本金×月利率×（1+月利率）^还款月数]÷[（1+月利率）^还款月数－1]
    var monthLoan = loan / 100 / 12;
    var principal = amount * 10000; //贷款金额
    //每个月还款金额
    var monthRefund = (principal * monthLoan * Math.pow(1 + monthLoan, month))
      / (Math.pow(1 + monthLoan, month) - 1);
    $('#monthRefund').text(monthRefund.toFixed(2));
    $('#interest').text((monthRefund * month - principal).toFixed(2));

    //收益，复投
    var monthInvest = invest / 100 / 12;
    var investIncome = principal; //当期剩余金额，包括每期赚取的利息，首次为贷款总额
    for (var i = 0; i < month; i++) {
      //当期收益
      var income = investIncome > 0 ? investIncome * monthInvest : 0;
      //下一期本金
      investIncome = investIncome + income - monthRefund;
    }
    $('#investIncome').text(investIncome.toFixed(2));
  });
});