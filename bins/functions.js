 $(function() {
   $( "#scenario1 ul.droptrue" ).sortable({
     connectWith: "ul",
     containment:"#scenario1"
   });

    $( "#scenario2 ul.droptrue" ).sortable({
        connectWith: "ul",
        containment:"#scenario2"
    });

    $( "#scenario3 ul.droptrue" ).sortable({
        connectWith: "ul",
        containment:"#scenario3"
    });

    $( "#scenario4 ul.droptrue" ).sortable({
        connectWith: "ul",
        containment:"#scenario4"
    });

   $( "#sortable1, #sortable2, #sortable3" ).disableSelection();
 });
