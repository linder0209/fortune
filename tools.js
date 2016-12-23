$(function () {
  $('#calculation').click(function () {
    //贷款金额
    var amount = $('#amount').val();
    //每月还款
    var monthRefund = $('#monthRefund').val();
    //贷款周期，多少月
    var month = $('#month').val();
    //年利率，初始为 10
    var loan = 10;

    //[贷款本金×月利率×（1+月利率）^还款月数]÷[（1+月利率）^还款月数－1]
    var monthLoan = loan / 100 / 12;
    var principal = amount * 10000; //贷款金额
    //每个月还款金额
    var _monthRefund = cal(principal, monthLoan, month);

    while(Math.abs(monthRefund - _monthRefund) > 0.1){
      if(monthRefund > _monthRefund){
        loan = loan + 0.001;
        monthLoan = loan / 100 / 12;
      } else {
        loan = loan - 0.001;
        monthLoan = loan / 100 / 12;
      }
      _monthRefund = cal(principal, monthLoan, month);
    }

    $('#loan').text((monthLoan * 12 * 100).toFixed(2));

    $('#interest').text((monthRefund * month - principal).toFixed(2));
  });

  function cal(principal, monthLoan, month) {
    //每个月还款金额
    return (principal * monthLoan * Math.pow(1 + monthLoan, month))
      / (Math.pow(1 + monthLoan, month) - 1);
  }
});