<?php

use Skyline\Component\Config\AbstractComponent;
use Skyline\Component\Config\CSSComponent;
use Skyline\Component\Config\JavaScriptComponent;

return [
	// all these keys can be required in templates like @require YourComponent
    "Skyline" => [
    	// Use the JavaScriptComponent to load the scripts in html head tag, so before any content gets loaded.
		"js" => new JavaScriptComponent(
				...AbstractComponent::makeLocalFileComponentArguments(
				"/Public/Skyline/skyline.min.js",
				__DIR__ . "/dist/skyline.min.js"
			)
		),
        "css" => new CSSComponent(
        	// CSS components are always loaded before the body contents.
			...AbstractComponent::makeLocalFileComponentArguments(
				"/Public/Skyline/skyline.min.css",
				__DIR__ . "/dist/skyline.min.css",
				'sha384',
				NULL,
				'all'
			)
		)
    ]
];