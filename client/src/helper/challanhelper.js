import $ from "jquery";
export function challanhelper() {
  function print_today() {
    // ***********************************************
    // AUTHOR: WWW.CGISCRIPT.NET, LLC
    // URL: http://www.cgiscript.net
    // Use the script, just leave this message intact.
    // Download your FREE CGI/Perl Scripts today!
    // ( http://www.cgiscript.net/scripts.htm )
    // ***********************************************
    var now = new Date();
    var months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    var date = (now.getDate() < 10 ? "0" : "") + now.getDate();
    function fourdigits(number) {
      return number < 1000 ? number + 1900 : number;
    }
    var today =
      months[now.getMonth()] + " " + date + ", " + fourdigits(now.getYear());
    return today;
  }

  // from http://www.mediacollege.com/internet/javascript/number/round.html
  function roundNumber(number, decimals) {
    var newString; // The new rounded number
    decimals = Number(decimals);
    if (decimals < 1) {
      newString = Math.round(number).toString();
    } else {
      var numString = number.toString();
      if (numString.lastIndexOf(".") === -1) {
        // If there is no decimal point
        numString += "."; // give it one at the end
      }
      var cutoff = numString.lastIndexOf(".") + decimals; // The point at which to truncate the number
      var d1 = Number(numString.substring(cutoff, cutoff + 1)); // The value of the last decimal place that we'll end up with
      var d2 = Number(numString.substring(cutoff + 1, cutoff + 2)); // The next decimal, after the last one we want
      if (d2 >= 5) {
        // Do we need to round up at all? If not, the string will just be truncated
        if (d1 === 9 && cutoff > 0) {
          // If the last digit is 9, find a new cutoff point
          while (cutoff > 0 && (d1 === 9 || isNaN(d1))) {
            if (d1 !== ".") {
              cutoff -= 1;
              d1 = Number(numString.substring(cutoff, cutoff + 1));
            } else {
              cutoff -= 1;
            }
          }
        }
        d1 += 1;
      }
      if (d1 === 10) {
        numString = numString.substring(0, numString.lastIndexOf("."));
        var roundedNum = Number(numString) + 1;
        newString = roundedNum.toString() + ".";
      } else {
        newString = numString.substring(0, cutoff) + d1.toString();
      }
    }
    if (newString.lastIndexOf(".") === -1) {
      // Do this again, to the new string
      newString += ".";
    }
    var decs = newString.substring(newString.lastIndexOf(".") + 1).length;
    for (var i = 0; i < decimals - decs; i++) newString += "0";
    //var newNumber = Number(newString);// make it a number if you like
    return newString; // Output the result to the form field (change for your purposes)
  }

  function update_total() {
    var total = 0;
    $("#price").each(function (i) {
      let price = $(this).html().replace("₹", "");
      if (!isNaN(price)) total += Number(price);
    });

    total = roundNumber(total, 2);

    $("#subtotal").html("₹" + total);
    $("#total").html("₹" + total);

    update_balance();
  }

  function update_balance() {
    var due =
      $("#total").html().replace("₹", "") - $("#paid").val().replace("₹", "");
    due = roundNumber(due, 2);

    $(".due").html("₹" + due);
  }

  function update_price() {
    var row = $(this).parents("#item-row");
    var price =
      row.find("#cost").val().replace("₹", "") * row.find("#qty").val() -
      row.find("#disc").val();
    price = roundNumber(price, 2);
    isNaN(price)
      ? row.find("#price").html("N/A")
      : row.find("#price").html("₹" + price);
    update_total();
  }

  function bind() {
    $("#cost").blur(update_price);
    $("#qty").blur(update_price);
    $("#disc").blur(update_price);
  }

  $(document).ready(function () {
    $("input").click(function () {
      $(this).select();
    });

    $("#paid").blur(update_balance);

    $("#addrow").click(function () {
      $("#item-row:last").after(
        '<div class="row row-sm" id="item-row"><div class="col-4 mx-0 px-1" id="item-name"><input class="col-sm-12" id="item-name" value="" placeholder="Item Name" /><input class="col-sm-12" id="description" value="" placeholder="Description" /><div  class="mx-0 px-0 py-0 my-0"><p  id="delete"class="tx-14 tx-danger my-0">X</p></div></div><div class="col-1 mx-0 px-1"><input class="col-sm-12" id="qty" value=""/></div><div class="col-2 mx-0 px-1"><input class="col-sm-12" value="" id="cost" /></div><div class="col-2 mx-0 px-1"><input class="col-sm-12" id="disc"value="" /></div><div class="col-2 mx-0 px-1"><span class="col-sm-12" id="price"></span></div></div>'
      );

      if ($("#delete").length > 0) {
        $("#delete").show();
        console.log("Heo");
      }
      var x = $("#delete").length;
      console.log(x);
      bind();
    });

    bind();

    $("#delete").on("click", function () {
      console.log("deleted");
      $(this).parent("#item-row").remove();

      update_total();
      if ($("#delete").length < 2) {
        $("#delete").hide();
        console.log("Heelo");
      }
    });

    $("#date").val(print_today());
  });
}
