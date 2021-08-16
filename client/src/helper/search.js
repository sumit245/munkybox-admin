export function searchTable() {
  // Declare variables
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  table = document.getElementById("myTable");
  tr = table.getElementsByTagName("tr");

  // Loop through all table rows, and hide those who don't match the search query
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[0];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}

export function searchColumn(inputid, tableid) {
  // Declare variables
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById(inputid);
  filter = input.value.toUpperCase();
  table = document.getElementById(tableid);
  tr = table.getElementsByTagName("tr");

  // Loop through all table rows, and hide those who don't match the search query
  for (i = 0; i < tr.length; i++) {
    if (inputid === "clientNameSearch") {
      td = tr[i].getElementsByTagName("td")[0];
    } else if (inputid === "clientCompanySearch") {
      td = tr[i].getElementsByTagName("td")[1];
    } else if (inputid === "clientMobileSearch") {
      td = tr[i].getElementsByTagName("td")[2];
    } else if (inputid === "clientAddressSearch") {
      td = tr[i].getElementsByTagName("td")[3];
    }
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}
