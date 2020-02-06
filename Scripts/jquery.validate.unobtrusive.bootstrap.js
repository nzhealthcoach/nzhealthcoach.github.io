/*!
 * jQuery Validate Unobtrusive Bootstrap 1.2.3
 *
 * https://github.com/sandrocaseiro/jquery.validate.unobtrusive.bootstrap
 *
 * Copyright 2014 Sandro Caseiro
 * Released under the MIT license:
 *   http://www.opensource.org/licenses/mit-license.php
 *
 * Modified by R. Kiessig
 * 31 July 2016
 */

(function($)
{
	function escapeAttributeValue(value)
	{
		// As mentioned on http://api.jquery.com/category/selectors/
		return value.replace(/([!"#$%&'()*+,./:;<=>?@\[\\\]^`{|}~])/g, "\\$1");
	}

	function addErrorClass(element)
	{
		var group = element.closest('.form-group');
		if (group && group.length > 0)
		{
			group.addClass('has-error').removeClass('has-success');
			if (!group.hasClass("has-feedback")) {
			    group.addClass("has-feedback");
			}

			var _feedbackIcon = $(element).closest(".form-group").find(".glyphicon");
			if (_feedbackIcon.length) {
			    $(_feedbackIcon)
                    .removeClass("glyphicon-ok")
                    .removeClass("glyphicon-remove")
                    .addClass("glyphicon-remove");
			}
			else {
			    $("<span class='glyphicon glyphicon-remove form-control-feedback' aria-hidden='true'></span>")
                    .insertAfter(element);
			}
        }
	}
	window.addErrorClass = addErrorClass;

	function addSuccessClass(element)
	{
		var group = element.closest('.form-group');
		if (group && group.length > 0)
		{
			group.addClass('has-success').removeClass('has-error');
			if (!group.hasClass("has-feedback")) {
			    group.addClass("has-feedback");
			}

			var _feedbackIcon = $(element).closest(".form-group").find(".glyphicon");
			if (_feedbackIcon.length) {
			    $(_feedbackIcon)
                    .removeClass("glyphicon-ok")
                    .removeClass("glyphicon-remove")
                    .addClass("glyphicon-ok");
			}
			else {
			    $("<span class='glyphicon glyphicon-ok form-control-feedback' aria-hidden='true'></span>")
                    .insertAfter(element);
			}
        }
	}
	window.addSuccessClass = addSuccessClass;

	function onError(formElement, errorPlacementBase, error, inputElement)
	{
		errorPlacementBase(error, inputElement);

		if ($(inputElement).hasClass('input-validation-error'))
		{
			addErrorClass(inputElement)
		}
	}

	function onSuccess(successBase, error)
	{
		var container = error.data("unobtrusiveContainer");

		successBase(error);

		if (container)
		{
			addSuccessClass(container);
		}
	}

	$.fn.validateBootstrap = function(refresh)
	{
		return this.each(function()
		{
			var $this = $(this);
			if (refresh)
			{
				$this.removeData('validator');
				$this.removeData('unobtrusiveValidation');
				$.validator.unobtrusive.parse($this);
			}
			
			var validator = $this.data('validator');

			if (validator)
			{
				validator.settings.errorClass += ' text-danger';
				var errorPlacementBase = validator.settings.errorPlacement;
				var successBase = validator.settings.success;

				validator.settings.errorPlacement = function(error, inputElement)
				{
					onError($this, errorPlacementBase, error, inputElement);
				};

				validator.settings.success = function(error)
				{
					onSuccess(successBase, error);
				}

				$this.find('.input-validation-error').each(function()
				{
					var errorElement = $this.find("[data-valmsg-for='" + escapeAttributeValue($(this)[0].name) + "']");
					var newElement = $(document.createElement(validator.settings.errorElement))
						.addClass('text-danger')
						.attr('for', escapeAttributeValue($(this)[0].name))
						.text(errorElement.text());
					onError($this, errorPlacementBase, newElement, $(this));
				});
			}
			// if validation isn't enabled, but the form has the validation error message element, add error class to container
			else
			{
				$this.find('.input-validation-error').each(function()
				{
					addErrorClass($(this));
				});
			}
		});
	};

	$(function()
	{
		$('form').validateBootstrap();
	});

}(jQuery));