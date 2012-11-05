(function (reservations, $, undefined) {
	reservations.current_step = null;
	reservations.reservations = null;

	reservations.initialize = function() {
		reservations.current_step = 1;
		
		$('#wizard').modal({
			keyboard: false,
			show: true
		});
		
		reservations.perform_step();
	};
	
	reservations.perform_step = function() {
		var tmpl = $("#tmpl-step" + reservations.current_step).html();
		$('.modal').empty();
		//Rendering the steps
		switch(reservations.current_step)
		{
		case 2:
			var compiled = _.template(tmpl, {resources: reservations.resources, departments: reservations.departments});
		  break;
		case 3:
			var compiled = _.template(tmpl, {questions: reservations.questions});
		  break;
		case 4:
			var compiled = _.template(tmpl, {});
		  break;
		default:
			var compiled = _.template(tmpl, {reservations: reservations.reservations, resource_categories: reservations.resource_categories});
		}
		$('.modal').html(compiled);
		//Initializations for each step
		switch(reservations.current_step)
		{
		case 2:
			// Source: http://jsatt.blogspot.com/2010/01/cascading-select-boxes-using-jquery.html
			function cascadeSelect(parent, child){
					var childOptions = child.find('option:not(.static)');
						child.data('options',childOptions);

					parent.change(function(){
						childOptions.remove();
						child
							.append(child.data('options').filter('.dep_' + this.value))
							.change();
					})

					childOptions.not('.static, .dep_' + parent.val()).remove();
			}
			
			$('fieldset.dept-resource').ready( function(e){
				cascadeForm = $('.new_reservation');
				departmentSelect = cascadeForm.find('#resource_ou_uid');
				resourceSelect = cascadeForm.find('#resource_id');

				cascadeSelect(departmentSelect, resourceSelect);
			});
		  break;
		case 3:
		  break;
		case 4:
			$('#calendar').fullCalendar('render');
		  break;
		default:
			$('a[data-method="delete"]').on('ajax:success', function(e) {
				$(this).parent().parent().fadeOut();
			});
			$('input.wizard-resource').click(function(e) {
			  reservations.current_step = 2;
			  reservations.perform_step();
			  console.log(e.target.dataset.category); //TODO: Assign a variable to hold the category id here
			});
		}
		//Common initializations
		$('input#back').click(function(e){
			reservations.current_step = parseInt(e.target.dataset.step) - 1;
			reservations.perform_step();
		});
		$('input#next').click(function(e){
			reservations.current_step = parseInt(e.target.dataset.step) + 1;
			console.log("current step: " + reservations.current_step);
			reservations.perform_step();
		});
		
	}

} (window.reservations = window.reservations || {}, jQuery));
