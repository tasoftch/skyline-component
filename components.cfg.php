<?php

use Skyline\Component\Config\AbstractComponent;
use Skyline\Component\Config\CSSComponent;
use Skyline\Component\Config\JavaScriptPostLoadComponent;
use Skyline\Component\Config\JavaScriptComponent;

return [
	// all these keys can be required in templates like @require YourComponent
    "YourComponent" => [
    	// Use the JavaScriptComponent to load the scripts in html head tag, so before any content gets loaded.
		"js-pre" => new JavaScriptComponent(
				...AbstractComponent::makeLocalFileComponentArguments(
				"/Public/js/your-component-uri.js",
				__DIR__ . "/dist/skyline-component-template.min.js"
			)
		),

		// Use the JavaScriptPostLoadComponent to load the script after loading the html page (at end of body tag).
        "js" => new JavaScriptPostLoadComponent(
        	...AbstractComponent::makeLocalFileComponentArguments(
				"/Public/js/your-component-uri.js",
				__DIR__ . "/dist/skyline-component-template.min.js"
			)
        ),

        "css" => new CSSComponent(
        	// CSS components are always loaded before the body contents.
			...AbstractComponent::makeLocalFileComponentArguments(
				"/Public/js/your-component-uri.css",
				__DIR__ . "/dist/skyline-component-template.min.css",
				'sha384',
				NULL,
				'all'
			)
		),
        AbstractComponent::COMP_REQUIREMENTS => [
        	// Add dependencies for the component identified by their names.
			// Same name as you used here in this file.
            'Skyline'
        ]
    ]
];