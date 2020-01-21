{   "targets":
    [   {   "target_name"   : "ocoge_pigpiod"
        ,   "sources"       : [ "ocoge_pigpiod.cpp" ]
        ,   "defines"       : [ "NAPI_DISABLE_CPP_EXCEPTIONS" ]
        ,   "include_dirs"  : [ "<!@(node -p \"require( 'node-addon-api' ).include\")" ]
        ,		"dependencies"	: ["<!(node -p \"require('node-addon-api').gyp\")"]
        ,   "libraries"     : [ "-lpigpiod_if2", "-lrt" ]
        }
    ]
}