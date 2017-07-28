export default `
  /* ------------------------------------------------------------ *\
    Pixel Parallel Panel
  \* ------------------------------------------------------------ */

  * { padding: 0; margin: 0; outline: 0; border: 0; box-sizing: border-box; }

  body { font-family: Roboto, Arial, Helvetica, sans-serif; font-size: 12px; line-height: 1; color: rgba(0,0,0,.85); overflow: hidden; font-weight: 500; }


  /* ------------------------------------------------------------ *\
    Buttons
  \* ------------------------------------------------------------ */

  .btn { display: inline-block; position: relative; overflow: hidden; background: #2196f3; padding: 0 15px; border-radius: 2px; font-size: 14px; line-height: 32px; color: #fff; text-transform: uppercase; text-decoration: none; text-align: center; cursor: pointer; transition: 200ms; }
  .btn:hover { background: #2980b9; }
  
  .btn-block { display: block; width: 100%; padding-left: 0; padding-right: 0; }

  .btn-success { background: #abdc28; }
  .btn-success:hover { background: #9ac117; }

  .btn-danger { background: #e85128; }
  .btn-danger:hover { background: #e04a28; }

  .btn[disabled] { background: #ccc; cursor: default; }

  .btn-file input { position: absolute; left: 0; top: 0; width: 100%; height: 100%; opacity: 0.01; cursor: pointer; }


  /* ------------------------------------------------------------ *\
    Grid
  \* ------------------------------------------------------------ */

  .row { padding: 10px 15px; }
  .row:after { content: ''; line-height: 0; display: table; clear: both; }

  .row-head { border-bottom: 1px solid #ebebeb; padding-top: 10px; padding-bottom: 10px; margin-bottom: 10px; }
  .row-head-large-gutter { padding-top: 21px; padding-bottom: 21px; }

  .col { float: left; padding: 0 5px; display: table; width: 100%; }
  .col-1-of-2 { width: 50%; }

  .col-1-of-3 { width: 33.33%; }
  .col-2-of-3 { width: 66.66%; }

  .col-1-of-4 { width: 25%; }
  .col-3-of-4 { width: 75%; }

  .col-1-of-5 { width: 20%; }
  .col-2-of-5 { width: 40%; }
  .col-3-of-5 { width: 60%; }
  .col-4-of-5 { width: 80%; }

  @media (max-width: 372px) {
    .row { padding-left: 5px; padding-right: 5px; }
  }


  /* ------------------------------------------------------------ *\
    Header
  \* ------------------------------------------------------------ */

  .header { border-bottom: 1px solid #ebebeb; }


  /* ------------------------------------------------------------ *\
    Panel Control
  \* ------------------------------------------------------------ */
  
  .panel-control { float: right; padding-right: 10px; }
  .panel-control ul { list-style: none; }
  .panel-control li { float: left; }
  .panel-control li a { display: block; position: relative; height: 48px; width: 30px; line-height: 48px; text-align: center; }
  .panel-control li a .ico { position: absolute; top: 50%; left: 50%; margin-top: -6px; margin-left: -5px; transition: 200ms; }
  .panel-control li a .ico-minimize { margin-top: 1px; margin-left: -3px; }
  .panel-control li a .ico-eye-slash-small { margin-left: -6px; }


  /* ------------------------------------------------------------ *\
    Nav
  \* ------------------------------------------------------------ */
  
  .nav { overflow: hidden; margin-bottom: -1px; }
  .nav ul { list-style: none outside none; overflow: hidden; }
  .nav li { float: left; }
  .nav li a { display: block; position: relative; height: 48px; padding: 0 20px; line-height: 50px; color: rgba(0,0,0,.5); font-size: 16px; text-decoration: none; text-transform: uppercase; transition: 200ms; }
  .nav li a:after { content: ''; position: absolute; bottom: 0; left: 50%; transform: translateX(-50%); width: 0; height: 2px; background: #2196f3; transition: 200ms; }
  .nav li.current a { color: #2196f3; }
  .nav li.current a:after { width: 100%; }
  .nav li a:hover { color: #2196f3; }

  @media (max-width: 372px) {
    .nav li a .ad { display: none; }
  }


  /* ------------------------------------------------------------ *\
    Number
  \* ------------------------------------------------------------ */
  
  .number { display: block; }

  .number .number-field { display: block; position: relative; }
  
  .number .number-arrows { position: absolute; top: 50%; right: 2px; width: 10px; height: 16px; margin-top: -8px; }
  .number .number-arrow { position: absolute; font-size: 0; line-height: 0; color: #bdbdbd; cursor: pointer; transition: 200ms; }
  .number .number-arrow:nth-child(1) { top: 0; left: 0; }
  .number .number-arrow:nth-child(2) { bottom: 0; left: 0; }
  .number .number-arrow-up { border-width: 0 5px 5px; border-style: none outset solid; border-left-color: transparent; border-right-color: transparent; }
  .number .number-arrow-down { border-width: 5px 5px 0; border-style: solid outset none; border-left-color: transparent; border-right-color: transparent; }
  .number .number-arrow:hover { color: #2196f3; }

  .number .number-input { display: block; width: 100%; border: 0 none; border-bottom: 2px solid #bdbdbd; font-family: inherit; font-size: 14px; font-weight: inherit; line-height: 30px; color: rgba(0,0,0,.5); transition: 200ms; -moz-appearance: textfield; }
  .number .number-input::-webkit-outer-spin-button,
  .number .number-input::-webkit-inner-spin-button { -webkit-appearance: none; margin: 0; }

  .number:active .number-input,
  .number .number-input:focus { border-color: #2196f3; outline: 0 none; color: rgba(0,0,0,.85); }

  .number .number-arrows + .number-input { padding-right: 20px; }


  /* ------------------------------------------------------------ *\
    Toggle
  \* ------------------------------------------------------------ */
  
  .toggle { display: block; cursor: pointer; padding-bottom: 1px; }
  .toggle .toggle-checkbox { position: absolute; opacity: 0; z-index: -999; }
  
  .toggle .toggle-title { display: block; margin-bottom: 10px; }
  .toggle .toggle-title a { text-decoration: underline; color: inherit; font-size: .9em; }

  .toggle .toggle-main,
  .toggle .toggle-handle { transition: 200ms; }

  .toggle .toggle-main { display: block; position: relative; width: 40px; height: 14px; border-radius: 100px; background: #898989; }
  .toggle .toggle-handle { position: absolute; top: -3px; left: 0; width: 20px; height: 20px; border-radius: 50%; background: #fff; box-shadow: 0 2px 5px rgba(0,0,0,.2); transform: translateX(0%); }

  .toggle-checked .toggle-main { background: #90caf9; }
  .toggle-checked .toggle-handle { background: #2196f3; transform: translateX(100%); }


  /* ------------------------------------------------------------ *\
    Icon Link
  \* ------------------------------------------------------------ */

  .icon-link-group { margin: 0 -10px; }

  .icon-link { display: inline-block; text-decoration: none; color: #000; opacity: .5; padding: 10px; transition: 200ms; font-weight: 400; text-transform: uppercase; }
  .icon-link.active,
  .icon-link:hover { opacity: 1; }
  .icon-link.active { color: #2196f3; }

  .icon-link .text { display: inline-block; vertical-align: middle; }
  .icon-link .ico { transition: 200ms; margin-right: 5px; }


  /* ------------------------------------------------------------ *\
    Paste Box
  \* ------------------------------------------------------------ */
  
  .paste-box { display: inline-block; position: relative; overflow: hidden; height: 32px; width: 100%; font-size: 0; line-height: 0; background: #fff; border: 2px dashed #2196f3; text-align: center; border-radius: 2px; vertical-align: middle; transition: 200ms; }
  .paste-box > * { display: none; }
  .paste-box:focus { border-style: solid; }
  .paste-box:before { content: attr(title); display: block; line-height: 28px; font-size: 14px; text-transform: uppercase; color: #2196f3; }

  /* ------------------------------------------------------------ *\
    Elements Divider
  \* ------------------------------------------------------------ */
  
  .elements-divider { display: block; text-align: center; color: #000; text-transform: uppercase; padding: 10px 0; }


  /* ------------------------------------------------------------ *\
    Droparea
  \* ------------------------------------------------------------ */
  
  .droparea { display: none; position: absolute; top: 0; left: 0; z-index: 999; width: 100%; height: 100%; background: #fff; }
  .droparea:after { content: ''; position: absolute; top: 10px; bottom: 10px; left: 10px; right: 10px; border: 4px dashed #2196f3; border-radius: 4px; }
  .droparea input { position: absolute; top: 0; left: 0; z-index: 9; width: 100%; height: 100%; opacity: 0; }
  .droparea .droparea-title { position: absolute; top: 50%; left: 0; right: 0; text-align: center; font-size: 26px; line-height: 30px; margin-top: -15px; color: #2196f3; font-weight: normal; }

  .droparea.enabled { display: block; }


  /* ------------------------------------------------------------ *\
    States
  \* ------------------------------------------------------------ */

  .panel-control .ico-maximize { opacity: 0; }
  
  .nav,
  .main { transition: 200ms 200ms; }

  .pixelParallel-panel-content-minimized .nav,
  .pixelParallel-panel-content-minimized .main { opacity: 0; transition: 200ms; }
  .pixelParallel-panel-content-minimized .panel-control .ico-minimize { opacity: 0; transition: 200ms 200ms; }
  .pixelParallel-panel-content-minimized .panel-control .ico-maximize { opacity: 1; transition: 200ms 200ms; }
`;
