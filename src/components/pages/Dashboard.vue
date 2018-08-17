<template>
  <div id="project-dashboard" class="page-layout simple right-sidebar">
    <div class="page-content-wrapper custom-scrollbar" data-ps-id="8afaf382-4a1a-8758-5eb1-8754136dda56">
      <div class="page-header bg-secondary text-auto d-flex justify-content-between px-6 pt-4 pb-0">
        <div class="col no-gutters align-items-start justify-content-between flex-nowrap">
          <div>
            <span class="h2 text-white-500">Dashboard</span>
          </div>
          <button type="button" class="sidebar-toggle-button btn btn-icon d-block d-xl-none fuse-ripple-ready" data-fuse-bar-toggle="dashboard-project-sidebar" aria-label="Toggle sidebar">
            <i class="icon icon-menu"></i>
          </button>
        </div>
        <div class="col-auto">
          <p class="title h6"><span class="small">Date of Report: </span>{{dateReport}}</p>
          <select class="h6 custom-select" v-model="activeMonth" @change="mountCharts">
            <option value="previous">Previous Month</option>
            <option value="current">Current Month</option>
            <option value="next">Next Month</option>
          </select>
          <button type="button" class="btn btn-icon fuse-ripple-ready" @click.prevent="createReport">
            <i class="icon icon-refresh"></i> Update Data
          </button>
        </div>
      </div>

      <div class="page-content">
        <div v-show="loading" id="loading">
          <loader-component />
        </div>

        <div v-show="!loading" class="tab-content">
          <div class="tab-pane fade p-3 active show" id="home-tab-pane">
            <!-- WIDGET GROUP -->
            <div class="widget-group row no-gutters">
              <!-- WIDGET 1 -->
              <div class="col-12 col-sm-6 col-xl-3 p-3">
                <div class="widget widget1 card">
                  <div class="widget-header pl-4 pr-2 row no-gutters align-items-center justify-content-between">
                    <div class="col">
                      <span class="h6">Total</span>
                    </div>
                  </div>
                  <div class="widget-content pt-2 pb-8 d-flex flex-column align-items-center justify-content-center">
                    <div class="title text-secondary">{{valueExpenses}}</div>
                    <div class="sub-title h6 text-muted">Total Price of Expenses</div>
                  </div>
                  <div class="widget-footer p-4 bg-light row no-gutters align-items-center">
                    <span class="text-muted">Quantity:</span>
                    <span class="ml-2">{{quantityExpenses}}</span>
                  </div>
                </div>
              </div>
              <!-- / WIDGET 1 -->

              <!-- WIDGET 2 -->
              <div class="col-12 col-sm-6 col-xl-3 p-3">
                <div class="widget widget2 card">
                  <div class="widget-header pl-4 pr-2 row no-gutters align-items-center justify-content-between">
                    <div class="col">
                      <span class="h6">Settled</span>
                    </div>
                  </div>
                  <div class="widget-content pt-2 pb-8 d-flex flex-column align-items-center justify-content-center">
                    <div class="title text-info">{{valueSettled}}</div>
                    <div class="sub-title h6 text-muted">Price Settled</div>
                  </div>
                  <div class="widget-footer p-4 bg-light row no-gutters align-items-center">
                    <span class="text-muted">Quantity:</span>
                    <span class="ml-2">{{quantitySettled}}</span>
                  </div>
                </div>
              </div>
              <!-- / WIDGET 2 -->

              <!-- WIDGET 3 -->
              <div class="col-12 col-sm-6 col-xl-3 p-3">
                <div class="widget widget3 card">
                  <div class="widget-header pl-4 pr-2 row no-gutters align-items-center justify-content-between">
                    <div class="col">
                      <span class="h6">Pending</span>
                    </div>
                  </div>
                  <div class="widget-content pt-2 pb-8 d-flex flex-column align-items-center justify-content-center">
                    <div class="title text-danger">{{valuePending}}</div>
                    <div class="sub-title h6 text-muted">Price Pending</div>
                  </div>
                  <div class="widget-footer p-4 bg-light row no-gutters align-items-center">
                    <span class="text-muted">Quantity:</span>
                    <span class="ml-2">{{quantityPending}}</span>
                  </div>
                </div>
              </div>
              <!-- / WIDGET 3 -->

              <!-- WIDGET 4 -->
              <div class="col-12 col-sm-6 col-xl-3 p-3">
                <div class="widget widget4 card">
                  <div class="widget-header pl-4 pr-2 row no-gutters align-items-center justify-content-between">
                    <div class="col">
                      <span class="h6">Most Expensive Category</span>
                    </div>
                  </div>
                  <div class="widget-content pt-2 pb-8 d-flex flex-column align-items-center justify-content-center">
                    <div class="title text-warning">{{categoryMostExpensive.price}}</div>
                    <div class="sub-title h6 text-muted">{{categoryMostExpensive.name}}</div>
                  </div>
                  <div class="widget-footer p-4 bg-light row no-gutters align-items-center">
                    <span class="text-muted">Quantity:</span>
                    <span class="ml-2">{{categoryMostExpensive.quantity}}</span>
                  </div>
                </div>
              </div>
              <!-- / WIDGET 4 -->

              <!-- WIDGET 5 -->
              <div class="col-sm-12 col-xl-6 p-3">
                <div class="widget widget5 card">
                  <div class="widget-header pl-4 pr-2 row no-gutters align-items-center justify-content-between">
                    <div class="col">
                      <span class="h6">Expense By Type</span>
                    </div>
                  </div>
                  <div class="widget-content p-2">
                    <canvas ref="expenseByType"></canvas>
                  </div>
                </div>
              </div>
              <!-- / WIDGET 5 -->

              <!-- WIDGET 6 -->
              <div class="col-sm-12 col-xl-6 p-3">
                <div class="widget widget6 card">
                  <div class="widget-header pl-4 pr-2 row no-gutters align-items-center justify-content-between">
                    <div class="col">
                      <span class="h6">Expense By Category</span>
                    </div>
                  </div>
                  <div class="widget-content p-2">
                    <canvas ref="expenseByCategory"></canvas>
                  </div>
                </div>
              </div>
              <!-- / WIDGET 6 -->

              <!-- WIDGET 5 -->
              <!-- <div class="col-12 p-3">
                <div class="widget widget5 card">
                  <div class="widget-header px-4 row no-gutters align-items-center justify-content-between">
                    <div class="col">
                      <span class="h6">Github Issues</span>
                    </div>
                    <div>
                      <button type="button" class="widget5-option-change-btn btn btn-link fuse-ripple-ready" data-interval="TW">This Week</button>
                      <button type="button" class="widget5-option-change-btn btn btn-link fuse-ripple-ready" data-interval="LW">Last Week</button>
                      <button type="button" class="widget5-option-change-btn btn btn-link fuse-ripple-ready" data-interval="2W">2 WEEKS AGO</button>
                    </div>
                  </div>
                  <div class="widget-content p-4">
                    <div class="row">
                      <div class="col-12 col-lg-6">
                        <div id="widget5-main-chart">
                          <svg class="nvd3-svg"><g class="nvd3 nv-wrap nv-multiBarWithLegend" transform="translate(32,48)"><g><g class="nv-x nv-axis nvd3-svg" transform="translate(0,356)"><g class="nvd3 nv-wrap nv-axis"><g><g class="tick zero" transform="translate(43.00685119628906,0)" style="opacity: 1;"><line y2="-356" style="opacity: 1;" x2="0"></line><text dy=".71em" y="7" transform="translate(0,0)" style="text-anchor: middle; opacity: 1;" x="0">Mon</text></g><g class="tick zero" transform="translate(109.17123413085938,0)" style="opacity: 1;"><line y2="-356" style="opacity: 1;" x2="0"></line><text dy=".71em" y="7" transform="translate(0,0)" style="text-anchor: middle; opacity: 1;" x="0">Tue</text></g><g class="tick zero" transform="translate(175.3356170654297,0)" style="opacity: 1;"><line y2="-356" style="opacity: 1;" x2="0"></line><text dy=".71em" y="7" transform="translate(0,0)" style="text-anchor: middle; opacity: 1;" x="0">Wed</text></g><g class="tick zero" transform="translate(241.5,0)" style="opacity: 1;"><line y2="-356" style="opacity: 1;" x2="0"></line><text dy=".71em" y="7" transform="translate(0,0)" style="text-anchor: middle; opacity: 1;" x="0">Thu</text></g><g class="tick zero" transform="translate(307.6643981933594,0)" style="opacity: 1;"><line y2="-356" style="opacity: 1;" x2="0"></line><text dy=".71em" y="7" transform="translate(0,0)" style="text-anchor: middle; opacity: 1;" x="0">Fri</text></g><g class="tick zero" transform="translate(373.8287658691406,0)" style="opacity: 1;"><line y2="-356" style="opacity: 1;" x2="0"></line><text dy=".71em" y="7" transform="translate(0,0)" style="text-anchor: middle; opacity: 1;" x="0">Sat</text></g><g class="tick zero" transform="translate(439.9931640625,0)" style="opacity: 1;"><line y2="-356" style="opacity: 1;" x2="0"></line><text dy=".71em" y="7" transform="translate(0,0)" style="text-anchor: middle; opacity: 1;" x="0">Sun</text></g><path class="domain" d="M0,0V0H483V0"></path><text class="nv-axislabel" text-anchor="middle" y="36" x="241.49999999999997" style="opacity: 1;"></text></g></g></g><g class="nv-y nv-axis nvd3-svg"><g class="nvd3 nv-wrap nv-axis"><g><g class="tick zero" transform="translate(0,356)" style="opacity: 1;"><line x2="483" y2="0"></line><text dy=".32em" x="-3" opacity="0" style="text-anchor: end;" y="0">0.0</text></g><g class="tick" transform="translate(0,288.8302001953125)" style="opacity: 1;"><line x2="483" y2="0"></line><text dy=".32em" x="-3" opacity="1" style="text-anchor: end;" y="0">10.0</text></g><g class="tick" transform="translate(0,221.66036987304688)" style="opacity: 1;"><line x2="483" y2="0"></line><text dy=".32em" x="-3" opacity="1" style="text-anchor: end;" y="0">20.0</text></g><g class="tick" transform="translate(0,154.49057006835938)" style="opacity: 1;"><line x2="483" y2="0"></line><text dy=".32em" x="-3" opacity="1" style="text-anchor: end;" y="0">30.0</text></g><g class="tick" transform="translate(0,87.32075500488281)" style="opacity: 1;"><line x2="483" y2="0"></line><text dy=".32em" x="-3" opacity="1" style="text-anchor: end;" y="0">40.0</text></g><g class="tick" transform="translate(0,20.150943756103516)" style="opacity: 1;" opacity="0"><line x2="483" y2="0"></line><text dy=".32em" x="-3" opacity="1" style="text-anchor: end;" y="0">50.0</text></g><path class="domain" d="M0,0H0V356H0"></path><text class="nv-axislabel" transform="rotate(-90)" y="-50" x="-178" style="text-anchor: middle;"></text></g><g class="nv-axisMaxMin nv-axisMaxMin-y nv-axisMin-y" transform="translate(0,356)"><text dy=".32em" y="0" x="-3" text-anchor="end" style="opacity: 1;">0.0</text></g><g class="nv-axisMaxMin nv-axisMaxMin-y nv-axisMax-y" transform="translate(0,0)"><text dy=".32em" y="0" x="-3" text-anchor="end" style="opacity: 1;">53.0</text></g></g></g><g class="nv-barsWrap nvd3-svg"><g class="nvd3 nv-wrap nv-multibar" transform="translate(0,0)"><defs><clipPath id="nv-edge-clip-3660"><rect width="483" height="356"></rect></clipPath></defs><g clip-path="url(#nv-edge-clip-3660)"><g class="nv-groups"><g class="nv-group nv-series-0" style="stroke-opacity: 1; fill-opacity: 0.75; fill: rgb(3, 169, 244); stroke: rgb(3, 169, 244);"><rect class="nv-bar positive" x="0" y="282.11320754716985" height="73.88679245283015" width="46.315068493150676" transform="translate(19.849315068493148,0)" style="fill: rgb(3, 169, 244); stroke: rgb(3, 169, 244);"></rect><rect class="nv-bar positive" x="0" y="288.8301886792453" height="67.16981132075472" width="46.315068493150676" transform="translate(86.01369863013699,0)" style="fill: rgb(3, 169, 244); stroke: rgb(3, 169, 244);"></rect><rect class="nv-bar positive" x="0" y="302.26415094339626" height="53.73584905660374" width="46.315068493150676" transform="translate(152.17808219178082,0)" style="fill: rgb(3, 169, 244); stroke: rgb(3, 169, 244);"></rect><rect class="nv-bar positive" x="0" y="282.11320754716985" height="73.88679245283015" width="46.315068493150676" transform="translate(218.34246575342465,0)" style="fill: rgb(3, 169, 244); stroke: rgb(3, 169, 244);"></rect><rect class="nv-bar positive" x="0" y="302.26415094339626" height="53.73584905660374" width="46.315068493150676" transform="translate(284.50684931506845,0)" style="fill: rgb(3, 169, 244); stroke: rgb(3, 169, 244);"></rect><rect class="nv-bar positive" x="0" y="288.8301886792453" height="67.16981132075472" width="46.315068493150676" transform="translate(350.6712328767123,0)" style="fill: rgb(3, 169, 244); stroke: rgb(3, 169, 244);"></rect><rect class="nv-bar positive" x="0" y="241.811320754717" height="114.188679245283" width="46.315068493150676" transform="translate(416.8356164383561,0)" style="fill: rgb(3, 169, 244); stroke: rgb(3, 169, 244);"></rect></g><g class="nv-group nv-series-1" style="stroke-opacity: 1; fill-opacity: 0.75; fill: rgb(179, 229, 252); stroke: rgb(179, 229, 252);"><rect class="nv-bar positive" x="0" y="0" height="282.11320754716985" width="46.315068493150676" transform="translate(19.849315068493148,0)" style="fill: rgb(179, 229, 252); stroke: rgb(179, 229, 252);"></rect><rect class="nv-bar positive" x="0" y="100.75471698113209" height="188.07547169811318" width="46.315068493150676" transform="translate(86.01369863013699,0)" style="fill: rgb(179, 229, 252); stroke: rgb(179, 229, 252);"></rect><rect class="nv-bar positive" x="0" y="13.43396226415094" height="288.83018867924534" width="46.315068493150676" transform="translate(152.17808219178082,0)" style="fill: rgb(179, 229, 252); stroke: rgb(179, 229, 252);"></rect><rect class="nv-bar positive" x="0" y="53.73584905660376" height="228.37735849056608" width="46.315068493150676" transform="translate(218.34246575342465,0)" style="fill: rgb(179, 229, 252); stroke: rgb(179, 229, 252);"></rect><rect class="nv-bar positive" x="0" y="167.9245283018868" height="134.33962264150946" width="46.315068493150676" transform="translate(284.50684931506845,0)" style="fill: rgb(179, 229, 252); stroke: rgb(179, 229, 252);"></rect><rect class="nv-bar positive" x="0" y="120.9056603773585" height="167.92452830188677" width="46.315068493150676" transform="translate(350.6712328767123,0)" style="fill: rgb(179, 229, 252); stroke: rgb(179, 229, 252);"></rect><rect class="nv-bar positive" x="0" y="94.03773584905662" height="147.77358490566039" width="46.315068493150676" transform="translate(416.8356164383561,0)" style="fill: rgb(179, 229, 252); stroke: rgb(179, 229, 252);"></rect></g></g></g></g></g><g class="nv-legendWrap nvd3-svg" transform="translate(180,-48)"><g class="nvd3 nv-legend" transform="translate(0,5)"><g transform="translate(129.552734375,5)"><g class="nv-series" transform="translate(0,5)"><circle class="nv-legend-symbol" r="5" style="stroke-width: 2; fill: rgb(3, 169, 244); fill-opacity: 1; stroke: rgb(3, 169, 244);"></circle><text text-anchor="start" class="nv-legend-text" dy=".32em" dx="8" fill="#000">Closed Issues</text></g><g class="nv-series" transform="translate(106.6484375,5)"><circle class="nv-legend-symbol" r="5" style="stroke-width: 2; fill: rgb(179, 229, 252); fill-opacity: 1; stroke: rgb(179, 229, 252);"></circle><text text-anchor="start" class="nv-legend-text" dy=".32em" dx="8" fill="#000">Issues</text></g></g></g></g><g class="nv-controlsWrap nvd3-svg" transform="translate(0,-48)"><g class="nvd3 nv-legend" transform="translate(0,5)"><g transform="translate(27.62890625,5)"><g class="nv-series" transform="translate(0,5)"><circle class="nv-legend-symbol" r="5" style="stroke-width: 2; fill: rgb(68, 68, 68); fill-opacity: 0; stroke: rgb(68, 68, 68);"></circle><text text-anchor="start" class="nv-legend-text" dy=".32em" dx="8" fill="#000">Grouped</text></g><g class="nv-series" transform="translate(77.43359375,5)"><circle class="nv-legend-symbol" r="5" style="stroke-width: 2; fill: rgb(68, 68, 68); fill-opacity: 1; stroke: rgb(68, 68, 68);"></circle><text text-anchor="start" class="nv-legend-text" dy=".32em" dx="8" fill="#000">Stacked</text></g></g></g></g><g class="nv-interactive"></g></g></g></svg>
                        </div>
                      </div>
                      <div class="col-12 col-lg-6">
                        <div id="widget5-supporting-charts" class="row">
                          <div class="col-6 p-4">
                            <div id="widget5-created-chart">
                              <div class="h6 text-muted">CREATED</div>
                              <div class="h2 count">48</div>
                              <div class="chart-wrapper">
                                <svg class="nvd3-svg"><g class="nvd3 nv-wrap nv-lineChart" transform="translate(0,8)"><g><g class="nv-legendWrap"></g><g class="nv-focus"><g class="nv-background"><rect width="248" height="42"></rect></g><g class="nv-x nv-axis" transform="translate(0,42)"></g><g class="nv-y nv-axis"></g><g class="nv-linesWrap nvd3-svg"><g class="nvd3 nv-wrap nv-line" transform="translate(0,0)"><defs><clipPath id="nv-edge-clip-11903"><rect width="248" height="42"></rect></clipPath></defs><g clip-path="url(#nv-edge-clip-11903)"><g class="nv-groups"><g class="nv-group nv-series-0" style="stroke-opacity: 1; stroke-width: 1.5; fill-opacity: 0.5; fill: rgb(3, 169, 244); stroke: rgb(3, 169, 244);"><path class="nv-area" d="M0,42Q33.06666666666666,42,41.33333333333333,42C53.73333333333333,42,70.26666666666665,42,82.66666666666666,42S111.6,42,124,42S152.9333333333333,42,165.33333333333331,42S194.26666666666668,42,206.66666666666669,42Q214.93333333333337,42,248,42L248,23.333333333333336Q214.93333333333337,6.533333333333336,206.66666666666669,4.666666666666669C194.26666666666668,1.866666666666668,177.73333333333332,1.866666666666668,165.33333333333331,4.666666666666669S136.4,18.433333333333337,124,23.333333333333336S95.06666666666666,35.93333333333333,82.66666666666666,37.33333333333333S53.73333333333333,34.06666666666666,41.33333333333333,32.666666666666664Q33.06666666666666,31.73333333333333,0,28.000000000000004Z"></path><path class="nv-line" d="M0,28.000000000000004Q33.06666666666666,31.73333333333333,41.33333333333333,32.666666666666664C53.73333333333333,34.06666666666666,70.26666666666665,38.73333333333333,82.66666666666666,37.33333333333333S111.6,28.233333333333334,124,23.333333333333336S152.9333333333333,7.4666666666666694,165.33333333333331,4.666666666666669S194.26666666666668,1.866666666666668,206.66666666666669,4.666666666666669Q214.93333333333337,6.533333333333336,248,23.333333333333336"></path></g></g><g class="nv-scatterWrap nvd3-svg" clip-path="url(#nv-edge-clip-11903)"><g class="nvd3 nv-wrap nv-scatter nv-chart-11903" transform="translate(0,0)"><defs><clipPath id="nv-edge-clip-11903"><rect transform="translate( -10, -10)" width="268" height="62"></rect></clipPath></defs><g clip-path=""><g class="nv-groups"><g class="nv-group nv-series-0 nv-noninteractive" style="stroke-opacity: 1; fill-opacity: 0.5; stroke: rgb(3, 169, 244); fill: rgb(3, 169, 244);"><path class="nv-point nv-point-0" transform="translate(0,28.000000000000004)" d="M0,2.256758334191025A2.256758334191025,2.256758334191025 0 1,1 0,-2.256758334191025A2.256758334191025,2.256758334191025 0 1,1 0,2.256758334191025Z"></path><path class="nv-point nv-point-1" transform="translate(41.33333206176758,32.66666793823242)" d="M0,2.256758334191025A2.256758334191025,2.256758334191025 0 1,1 0,-2.256758334191025A2.256758334191025,2.256758334191025 0 1,1 0,2.256758334191025Z"></path><path class="nv-point nv-point-2" transform="translate(82.66666412353516,37.33333206176758)" d="M0,2.256758334191025A2.256758334191025,2.256758334191025 0 1,1 0,-2.256758334191025A2.256758334191025,2.256758334191025 0 1,1 0,2.256758334191025Z"></path><path class="nv-point nv-point-3" transform="translate(124,23.33333396911621)" d="M0,2.256758334191025A2.256758334191025,2.256758334191025 0 1,1 0,-2.256758334191025A2.256758334191025,2.256758334191025 0 1,1 0,2.256758334191025Z"></path><path class="nv-point nv-point-4" transform="translate(165.3333282470703,4.666666507720947)" d="M0,2.256758334191025A2.256758334191025,2.256758334191025 0 1,1 0,-2.256758334191025A2.256758334191025,2.256758334191025 0 1,1 0,2.256758334191025Z"></path><path class="nv-point nv-point-5" transform="translate(206.6666717529297,4.666666507720947)" d="M0,2.256758334191025A2.256758334191025,2.256758334191025 0 1,1 0,-2.256758334191025A2.256758334191025,2.256758334191025 0 1,1 0,2.256758334191025Z"></path><path class="nv-point nv-point-6" transform="translate(248,23.33333396911621)" d="M0,2.256758334191025A2.256758334191025,2.256758334191025 0 1,1 0,-2.256758334191025A2.256758334191025,2.256758334191025 0 1,1 0,2.256758334191025Z"></path></g></g><g class="nv-point-paths"></g></g><g class="nv-point-clips"></g></g></g></g></g></g><g class="nv-interactive"><g class=" nv-wrap nv-interactiveLineLayer"><g class="nv-interactiveGuideLine"></g></g></g></g><g class="nv-focusWrap"></g></g></g></svg>
                              </div>
                            </div>
                          </div>
                          <div class="col-6 p-4">
                            <div id="widget5-closed-chart">
                              <div class="h6 text-muted">CLOSED</div>
                              <div class="h2 count">26</div>
                              <div class="chart-wrapper">
                                <svg class="nvd3-svg"><g class="nvd3 nv-wrap nv-lineChart" transform="translate(0,8)"><g><g class="nv-legendWrap"></g><g class="nv-focus"><g class="nv-background"><rect width="248" height="42"></rect></g><g class="nv-x nv-axis" transform="translate(0,42)"></g><g class="nv-y nv-axis"></g><g class="nv-linesWrap nvd3-svg"><g class="nvd3 nv-wrap nv-line" transform="translate(0,0)"><defs><clipPath id="nv-edge-clip-42777"><rect width="248" height="42"></rect></clipPath></defs><g clip-path="url(#nv-edge-clip-42777)"><g class="nv-groups"><g class="nv-group nv-series-0" style="stroke-opacity: 1; stroke-width: 1.5; fill-opacity: 0.5; fill: rgb(3, 169, 244); stroke: rgb(3, 169, 244);"><path class="nv-area" d="M0,42Q33.06666666666666,42,41.33333333333333,42C53.73333333333333,42,70.26666666666665,42,82.66666666666666,42S111.6,42,124,42S152.9333333333333,42,165.33333333333331,42S194.26666666666668,42,206.66666666666669,42Q214.93333333333337,42,248,42L248,9.333333333333332Q214.93333333333337,22.400000000000002,206.66666666666669,23.333333333333336C194.26666666666668,24.733333333333334,177.73333333333332,19.366666666666664,165.33333333333331,18.666666666666664S136.4,20.066666666666663,124,18.666666666666664S95.06666666666666,7.933333333333331,82.66666666666666,9.333333333333332S53.73333333333333,27.300000000000004,41.33333333333333,28.000000000000004Q33.06666666666666,28.466666666666672,0,14.000000000000002Z"></path><path class="nv-line" d="M0,14.000000000000002Q33.06666666666666,28.466666666666672,41.33333333333333,28.000000000000004C53.73333333333333,27.300000000000004,70.26666666666665,10.733333333333333,82.66666666666666,9.333333333333332S111.6,17.266666666666666,124,18.666666666666664S152.9333333333333,17.966666666666665,165.33333333333331,18.666666666666664S194.26666666666668,24.733333333333334,206.66666666666669,23.333333333333336Q214.93333333333337,22.400000000000002,248,9.333333333333332"></path></g></g><g class="nv-scatterWrap nvd3-svg" clip-path="url(#nv-edge-clip-42777)"><g class="nvd3 nv-wrap nv-scatter nv-chart-42777" transform="translate(0,0)"><defs><clipPath id="nv-edge-clip-42777"><rect transform="translate( -10, -10)" width="268" height="62"></rect></clipPath></defs><g clip-path=""><g class="nv-groups"><g class="nv-group nv-series-0 nv-noninteractive" style="stroke-opacity: 1; fill-opacity: 0.5; stroke: rgb(3, 169, 244); fill: rgb(3, 169, 244);"><path class="nv-point nv-point-0" transform="translate(0,14.000000000000002)" d="M0,2.256758334191025A2.256758334191025,2.256758334191025 0 1,1 0,-2.256758334191025A2.256758334191025,2.256758334191025 0 1,1 0,2.256758334191025Z"></path><path class="nv-point nv-point-1" transform="translate(41.33333206176758,28)" d="M0,2.256758334191025A2.256758334191025,2.256758334191025 0 1,1 0,-2.256758334191025A2.256758334191025,2.256758334191025 0 1,1 0,2.256758334191025Z"></path><path class="nv-point nv-point-2" transform="translate(82.66666412353516,9.333333015441895)" d="M0,2.256758334191025A2.256758334191025,2.256758334191025 0 1,1 0,-2.256758334191025A2.256758334191025,2.256758334191025 0 1,1 0,2.256758334191025Z"></path><path class="nv-point nv-point-3" transform="translate(124,18.66666603088379)" d="M0,2.256758334191025A2.256758334191025,2.256758334191025 0 1,1 0,-2.256758334191025A2.256758334191025,2.256758334191025 0 1,1 0,2.256758334191025Z"></path><path class="nv-point nv-point-4" transform="translate(165.3333282470703,18.66666603088379)" d="M0,2.256758334191025A2.256758334191025,2.256758334191025 0 1,1 0,-2.256758334191025A2.256758334191025,2.256758334191025 0 1,1 0,2.256758334191025Z"></path><path class="nv-point nv-point-5" transform="translate(206.6666717529297,23.33333396911621)" d="M0,2.256758334191025A2.256758334191025,2.256758334191025 0 1,1 0,-2.256758334191025A2.256758334191025,2.256758334191025 0 1,1 0,2.256758334191025Z"></path><path class="nv-point nv-point-6" transform="translate(248,9.333333015441895)" d="M0,2.256758334191025A2.256758334191025,2.256758334191025 0 1,1 0,-2.256758334191025A2.256758334191025,2.256758334191025 0 1,1 0,2.256758334191025Z"></path></g></g><g class="nv-point-paths"></g></g><g class="nv-point-clips"></g></g></g></g></g></g><g class="nv-interactive"><g class=" nv-wrap nv-interactiveLineLayer"><g class="nv-interactiveGuideLine"></g></g></g></g><g class="nv-focusWrap"></g></g></g></svg>
                              </div>
                            </div>
                          </div>
                          <div class="col-6 p-4">
                            <div id="widget5-re-opened-chart">
                              <div class="h6 text-muted">RE-OPENED</div>
                              <div class="h2 count">2</div>
                              <div class="chart-wrapper">
                                <svg class="nvd3-svg"><g class="nvd3 nv-wrap nv-lineChart" transform="translate(0,8)"><g><g class="nv-legendWrap"></g><g class="nv-focus"><g class="nv-background"><rect width="248" height="42"></rect></g><g class="nv-x nv-axis" transform="translate(0,42)"></g><g class="nv-y nv-axis"></g><g class="nv-linesWrap nvd3-svg"><g class="nvd3 nv-wrap nv-line" transform="translate(0,0)"><defs><clipPath id="nv-edge-clip-61979"><rect width="248" height="42"></rect></clipPath></defs><g clip-path="url(#nv-edge-clip-61979)"><g class="nv-groups"><g class="nv-group nv-series-0" style="stroke-opacity: 1; stroke-width: 1.5; fill-opacity: 0.5; fill: rgb(3, 169, 244); stroke: rgb(3, 169, 244);"><path class="nv-area" d="M0,42Q33.06666666666666,42,41.33333333333333,42C53.73333333333333,42,70.26666666666665,42,82.66666666666666,42S111.6,42,124,42S152.9333333333333,42,165.33333333333331,42S194.26666666666668,42,206.66666666666669,42Q214.93333333333337,42,248,42L248,23.333333333333336Q214.93333333333337,6.533333333333336,206.66666666666669,4.666666666666669C194.26666666666668,1.866666666666668,177.73333333333332,1.866666666666668,165.33333333333331,4.666666666666669S136.4,18.433333333333337,124,23.333333333333336S95.06666666666666,35.93333333333333,82.66666666666666,37.33333333333333S53.73333333333333,34.06666666666666,41.33333333333333,32.666666666666664Q33.06666666666666,31.73333333333333,0,28.000000000000004Z"></path><path class="nv-line" d="M0,28.000000000000004Q33.06666666666666,31.73333333333333,41.33333333333333,32.666666666666664C53.73333333333333,34.06666666666666,70.26666666666665,38.73333333333333,82.66666666666666,37.33333333333333S111.6,28.233333333333334,124,23.333333333333336S152.9333333333333,7.4666666666666694,165.33333333333331,4.666666666666669S194.26666666666668,1.866666666666668,206.66666666666669,4.666666666666669Q214.93333333333337,6.533333333333336,248,23.333333333333336"></path></g></g><g class="nv-scatterWrap nvd3-svg" clip-path="url(#nv-edge-clip-61979)"><g class="nvd3 nv-wrap nv-scatter nv-chart-61979" transform="translate(0,0)"><defs><clipPath id="nv-edge-clip-61979"><rect transform="translate( -10, -10)" width="268" height="62"></rect></clipPath></defs><g clip-path=""><g class="nv-groups"><g class="nv-group nv-series-0 nv-noninteractive" style="stroke-opacity: 1; fill-opacity: 0.5; stroke: rgb(3, 169, 244); fill: rgb(3, 169, 244);"><path class="nv-point nv-point-0" transform="translate(0,28.000000000000004)" d="M0,2.256758334191025A2.256758334191025,2.256758334191025 0 1,1 0,-2.256758334191025A2.256758334191025,2.256758334191025 0 1,1 0,2.256758334191025Z"></path><path class="nv-point nv-point-1" transform="translate(41.33333206176758,32.66666793823242)" d="M0,2.256758334191025A2.256758334191025,2.256758334191025 0 1,1 0,-2.256758334191025A2.256758334191025,2.256758334191025 0 1,1 0,2.256758334191025Z"></path><path class="nv-point nv-point-2" transform="translate(82.66666412353516,37.33333206176758)" d="M0,2.256758334191025A2.256758334191025,2.256758334191025 0 1,1 0,-2.256758334191025A2.256758334191025,2.256758334191025 0 1,1 0,2.256758334191025Z"></path><path class="nv-point nv-point-3" transform="translate(124,23.33333396911621)" d="M0,2.256758334191025A2.256758334191025,2.256758334191025 0 1,1 0,-2.256758334191025A2.256758334191025,2.256758334191025 0 1,1 0,2.256758334191025Z"></path><path class="nv-point nv-point-4" transform="translate(165.3333282470703,4.666666507720947)" d="M0,2.256758334191025A2.256758334191025,2.256758334191025 0 1,1 0,-2.256758334191025A2.256758334191025,2.256758334191025 0 1,1 0,2.256758334191025Z"></path><path class="nv-point nv-point-5" transform="translate(206.6666717529297,4.666666507720947)" d="M0,2.256758334191025A2.256758334191025,2.256758334191025 0 1,1 0,-2.256758334191025A2.256758334191025,2.256758334191025 0 1,1 0,2.256758334191025Z"></path><path class="nv-point nv-point-6" transform="translate(248,23.33333396911621)" d="M0,2.256758334191025A2.256758334191025,2.256758334191025 0 1,1 0,-2.256758334191025A2.256758334191025,2.256758334191025 0 1,1 0,2.256758334191025Z"></path></g></g><g class="nv-point-paths"></g></g><g class="nv-point-clips"></g></g></g></g></g></g><g class="nv-interactive"><g class=" nv-wrap nv-interactiveLineLayer"><g class="nv-interactiveGuideLine"></g></g></g></g><g class="nv-focusWrap"></g></g></g></svg>
                              </div>
                            </div>
                          </div>
                          <div class="col-6 p-4">
                            <div id="widget5-wont-fix-chart">
                              <div class="h6 text-muted">WON'T FIX</div>
                              <div class="h2 count">4</div>
                              <div class="chart-wrapper">
                                <svg class="nvd3-svg"><g class="nvd3 nv-wrap nv-lineChart" transform="translate(0,8)"><g><g class="nv-legendWrap"></g><g class="nv-focus"><g class="nv-background"><rect width="248" height="42"></rect></g><g class="nv-x nv-axis" transform="translate(0,42)"></g><g class="nv-y nv-axis"></g><g class="nv-linesWrap nvd3-svg"><g class="nvd3 nv-wrap nv-line" transform="translate(0,0)"><defs><clipPath id="nv-edge-clip-2678"><rect width="248" height="42"></rect></clipPath></defs><g clip-path="url(#nv-edge-clip-2678)"><g class="nv-groups"><g class="nv-group nv-series-0" style="stroke-opacity: 1; stroke-width: 1.5; fill-opacity: 0.5; fill: rgb(3, 169, 244); stroke: rgb(3, 169, 244);"><path class="nv-area" d="M0,42Q33.06666666666666,42,41.33333333333333,42C53.73333333333333,42,70.26666666666665,42,82.66666666666666,42S111.6,42,124,42S152.9333333333333,42,165.33333333333331,42S194.26666666666668,42,206.66666666666669,42Q214.93333333333337,42,248,42L248,9.333333333333332Q214.93333333333337,23.333333333333336,206.66666666666669,23.333333333333336C194.26666666666668,23.333333333333336,177.73333333333332,10.033333333333333,165.33333333333331,9.333333333333332S136.4,16.566666666666663,124,18.666666666666664S95.06666666666666,23.333333333333336,82.66666666666666,23.333333333333336S53.73333333333333,20.066666666666663,41.33333333333333,18.666666666666664Q33.06666666666666,17.73333333333333,0,14.000000000000002Z"></path><path class="nv-line" d="M0,14.000000000000002Q33.06666666666666,17.73333333333333,41.33333333333333,18.666666666666664C53.73333333333333,20.066666666666663,70.26666666666665,23.333333333333336,82.66666666666666,23.333333333333336S111.6,20.766666666666666,124,18.666666666666664S152.9333333333333,8.633333333333331,165.33333333333331,9.333333333333332S194.26666666666668,23.333333333333336,206.66666666666669,23.333333333333336Q214.93333333333337,23.333333333333336,248,9.333333333333332"></path></g></g><g class="nv-scatterWrap nvd3-svg" clip-path="url(#nv-edge-clip-2678)"><g class="nvd3 nv-wrap nv-scatter nv-chart-2678" transform="translate(0,0)"><defs><clipPath id="nv-edge-clip-2678"><rect transform="translate( -10, -10)" width="268" height="62"></rect></clipPath></defs><g clip-path=""><g class="nv-groups"><g class="nv-group nv-series-0 nv-noninteractive" style="stroke-opacity: 1; fill-opacity: 0.5; stroke: rgb(3, 169, 244); fill: rgb(3, 169, 244);"><path class="nv-point nv-point-0" transform="translate(0,14.000000000000002)" d="M0,2.256758334191025A2.256758334191025,2.256758334191025 0 1,1 0,-2.256758334191025A2.256758334191025,2.256758334191025 0 1,1 0,2.256758334191025Z"></path><path class="nv-point nv-point-1" transform="translate(41.33333206176758,18.66666603088379)" d="M0,2.256758334191025A2.256758334191025,2.256758334191025 0 1,1 0,-2.256758334191025A2.256758334191025,2.256758334191025 0 1,1 0,2.256758334191025Z"></path><path class="nv-point nv-point-2" transform="translate(82.66666412353516,23.33333396911621)" d="M0,2.256758334191025A2.256758334191025,2.256758334191025 0 1,1 0,-2.256758334191025A2.256758334191025,2.256758334191025 0 1,1 0,2.256758334191025Z"></path><path class="nv-point nv-point-3" transform="translate(124,18.66666603088379)" d="M0,2.256758334191025A2.256758334191025,2.256758334191025 0 1,1 0,-2.256758334191025A2.256758334191025,2.256758334191025 0 1,1 0,2.256758334191025Z"></path><path class="nv-point nv-point-4" transform="translate(165.3333282470703,9.333333015441895)" d="M0,2.256758334191025A2.256758334191025,2.256758334191025 0 1,1 0,-2.256758334191025A2.256758334191025,2.256758334191025 0 1,1 0,2.256758334191025Z"></path><path class="nv-point nv-point-5" transform="translate(206.6666717529297,23.33333396911621)" d="M0,2.256758334191025A2.256758334191025,2.256758334191025 0 1,1 0,-2.256758334191025A2.256758334191025,2.256758334191025 0 1,1 0,2.256758334191025Z"></path><path class="nv-point nv-point-6" transform="translate(248,9.333333015441895)" d="M0,2.256758334191025A2.256758334191025,2.256758334191025 0 1,1 0,-2.256758334191025A2.256758334191025,2.256758334191025 0 1,1 0,2.256758334191025Z"></path></g></g><g class="nv-point-paths"></g></g><g class="nv-point-clips"></g></g></g></g></g></g><g class="nv-interactive"><g class=" nv-wrap nv-interactiveLineLayer"><g class="nv-interactiveGuideLine"></g></g></g></g><g class="nv-focusWrap"></g></g></g></svg>
                              </div>
                            </div>
                          </div>
                          <div class="col-6 p-4">
                            <div id="widget5-needs-test-chart">
                              <div class="h6 text-muted">NEED'S TEST</div>
                              <div class="h2 count">8</div>
                              <div class="chart-wrapper">
                                <svg class="nvd3-svg"><g class="nvd3 nv-wrap nv-lineChart" transform="translate(0,8)"><g><g class="nv-legendWrap"></g><g class="nv-focus"><g class="nv-background"><rect width="248" height="42"></rect></g><g class="nv-x nv-axis" transform="translate(0,42)"></g><g class="nv-y nv-axis"></g><g class="nv-linesWrap nvd3-svg"><g class="nvd3 nv-wrap nv-line" transform="translate(0,0)"><defs><clipPath id="nv-edge-clip-80685"><rect width="248" height="42"></rect></clipPath></defs><g clip-path="url(#nv-edge-clip-80685)"><g class="nv-groups"><g class="nv-group nv-series-0" style="stroke-opacity: 1; stroke-width: 1.5; fill-opacity: 0.5; fill: rgb(3, 169, 244); stroke: rgb(3, 169, 244);"><path class="nv-area" d="M0,42Q33.06666666666666,42,41.33333333333333,42C53.73333333333333,42,70.26666666666665,42,82.66666666666666,42S111.6,42,124,42S152.9333333333333,42,165.33333333333331,42S194.26666666666668,42,206.66666666666669,42Q214.93333333333337,42,248,42L248,9.333333333333332Q214.93333333333337,22.400000000000002,206.66666666666669,23.333333333333336C194.26666666666668,24.733333333333334,177.73333333333332,19.366666666666664,165.33333333333331,18.666666666666664S136.4,20.066666666666663,124,18.666666666666664S95.06666666666666,7.933333333333331,82.66666666666666,9.333333333333332S53.73333333333333,27.300000000000004,41.33333333333333,28.000000000000004Q33.06666666666666,28.466666666666672,0,14.000000000000002Z"></path><path class="nv-line" d="M0,14.000000000000002Q33.06666666666666,28.466666666666672,41.33333333333333,28.000000000000004C53.73333333333333,27.300000000000004,70.26666666666665,10.733333333333333,82.66666666666666,9.333333333333332S111.6,17.266666666666666,124,18.666666666666664S152.9333333333333,17.966666666666665,165.33333333333331,18.666666666666664S194.26666666666668,24.733333333333334,206.66666666666669,23.333333333333336Q214.93333333333337,22.400000000000002,248,9.333333333333332"></path></g></g><g class="nv-scatterWrap nvd3-svg" clip-path="url(#nv-edge-clip-80685)"><g class="nvd3 nv-wrap nv-scatter nv-chart-80685" transform="translate(0,0)"><defs><clipPath id="nv-edge-clip-80685"><rect transform="translate( -10, -10)" width="268" height="62"></rect></clipPath></defs><g clip-path=""><g class="nv-groups"><g class="nv-group nv-series-0 nv-noninteractive" style="stroke-opacity: 1; fill-opacity: 0.5; stroke: rgb(3, 169, 244); fill: rgb(3, 169, 244);"><path class="nv-point nv-point-0" transform="translate(0,14.000000000000002)" d="M0,2.256758334191025A2.256758334191025,2.256758334191025 0 1,1 0,-2.256758334191025A2.256758334191025,2.256758334191025 0 1,1 0,2.256758334191025Z"></path><path class="nv-point nv-point-1" transform="translate(41.33333206176758,28)" d="M0,2.256758334191025A2.256758334191025,2.256758334191025 0 1,1 0,-2.256758334191025A2.256758334191025,2.256758334191025 0 1,1 0,2.256758334191025Z"></path><path class="nv-point nv-point-2" transform="translate(82.66666412353516,9.333333015441895)" d="M0,2.256758334191025A2.256758334191025,2.256758334191025 0 1,1 0,-2.256758334191025A2.256758334191025,2.256758334191025 0 1,1 0,2.256758334191025Z"></path><path class="nv-point nv-point-3" transform="translate(124,18.66666603088379)" d="M0,2.256758334191025A2.256758334191025,2.256758334191025 0 1,1 0,-2.256758334191025A2.256758334191025,2.256758334191025 0 1,1 0,2.256758334191025Z"></path><path class="nv-point nv-point-4" transform="translate(165.3333282470703,18.66666603088379)" d="M0,2.256758334191025A2.256758334191025,2.256758334191025 0 1,1 0,-2.256758334191025A2.256758334191025,2.256758334191025 0 1,1 0,2.256758334191025Z"></path><path class="nv-point nv-point-5" transform="translate(206.6666717529297,23.33333396911621)" d="M0,2.256758334191025A2.256758334191025,2.256758334191025 0 1,1 0,-2.256758334191025A2.256758334191025,2.256758334191025 0 1,1 0,2.256758334191025Z"></path><path class="nv-point nv-point-6" transform="translate(248,9.333333015441895)" d="M0,2.256758334191025A2.256758334191025,2.256758334191025 0 1,1 0,-2.256758334191025A2.256758334191025,2.256758334191025 0 1,1 0,2.256758334191025Z"></path></g></g><g class="nv-point-paths"></g></g><g class="nv-point-clips"></g></g></g></g></g></g><g class="nv-interactive"><g class=" nv-wrap nv-interactiveLineLayer"><g class="nv-interactiveGuideLine"></g></g></g></g><g class="nv-focusWrap"></g></g></g></svg>
                              </div>
                            </div>
                          </div>
                          <div class="col-6 p-4">
                            <div id="widget5-fixed-chart">
                              <div class="h6 text-muted">FIXED</div>
                              <div class="h2 count">14</div>
                              <div class="chart-wrapper">
                                <svg class="nvd3-svg"><g class="nvd3 nv-wrap nv-lineChart" transform="translate(0,8)"><g><g class="nv-legendWrap"></g><g class="nv-focus"><g class="nv-background"><rect width="248" height="42"></rect></g><g class="nv-x nv-axis" transform="translate(0,42)"></g><g class="nv-y nv-axis"></g><g class="nv-linesWrap nvd3-svg"><g class="nvd3 nv-wrap nv-line" transform="translate(0,0)"><defs><clipPath id="nv-edge-clip-8398"><rect width="248" height="42"></rect></clipPath></defs><g clip-path="url(#nv-edge-clip-8398)"><g class="nv-groups"><g class="nv-group nv-series-0" style="stroke-opacity: 1; stroke-width: 1.5; fill-opacity: 0.5; fill: rgb(3, 169, 244); stroke: rgb(3, 169, 244);"><path class="nv-area" d="M0,42Q33.06666666666666,42,41.33333333333333,42C53.73333333333333,42,70.26666666666665,42,82.66666666666666,42S111.6,42,124,42S152.9333333333333,42,165.33333333333331,42S194.26666666666668,42,206.66666666666669,42Q214.93333333333337,42,248,42L248,32.666666666666664Q214.93333333333337,29.400000000000006,206.66666666666669,28.000000000000004C194.26666666666668,25.900000000000002,177.73333333333332,20.766666666666666,165.33333333333331,18.666666666666664S136.4,13.3,124,14.000000000000002S95.06666666666666,24.033333333333335,82.66666666666666,23.333333333333336S53.73333333333333,10.033333333333333,41.33333333333333,9.333333333333332Q33.06666666666666,8.866666666666665,0,18.666666666666664Z"></path><path class="nv-line" d="M0,18.666666666666664Q33.06666666666666,8.866666666666665,41.33333333333333,9.333333333333332C53.73333333333333,10.033333333333333,70.26666666666665,22.633333333333336,82.66666666666666,23.333333333333336S111.6,14.700000000000003,124,14.000000000000002S152.9333333333333,16.566666666666663,165.33333333333331,18.666666666666664S194.26666666666668,25.900000000000002,206.66666666666669,28.000000000000004Q214.93333333333337,29.400000000000006,248,32.666666666666664"></path></g></g><g class="nv-scatterWrap nvd3-svg" clip-path="url(#nv-edge-clip-8398)"><g class="nvd3 nv-wrap nv-scatter nv-chart-8398" transform="translate(0,0)"><defs><clipPath id="nv-edge-clip-8398"><rect transform="translate( -10, -10)" width="268" height="62"></rect></clipPath></defs><g clip-path=""><g class="nv-groups"><g class="nv-group nv-series-0 nv-noninteractive" style="stroke-opacity: 1; fill-opacity: 0.5; stroke: rgb(3, 169, 244); fill: rgb(3, 169, 244);"><path class="nv-point nv-point-0" transform="translate(0,18.666666666666664)" d="M0,2.256758334191025A2.256758334191025,2.256758334191025 0 1,1 0,-2.256758334191025A2.256758334191025,2.256758334191025 0 1,1 0,2.256758334191025Z"></path><path class="nv-point nv-point-1" transform="translate(41.33333206176758,9.333333015441895)" d="M0,2.256758334191025A2.256758334191025,2.256758334191025 0 1,1 0,-2.256758334191025A2.256758334191025,2.256758334191025 0 1,1 0,2.256758334191025Z"></path><path class="nv-point nv-point-2" transform="translate(82.66666412353516,23.33333396911621)" d="M0,2.256758334191025A2.256758334191025,2.256758334191025 0 1,1 0,-2.256758334191025A2.256758334191025,2.256758334191025 0 1,1 0,2.256758334191025Z"></path><path class="nv-point nv-point-3" transform="translate(124,14)" d="M0,2.256758334191025A2.256758334191025,2.256758334191025 0 1,1 0,-2.256758334191025A2.256758334191025,2.256758334191025 0 1,1 0,2.256758334191025Z"></path><path class="nv-point nv-point-4" transform="translate(165.3333282470703,18.66666603088379)" d="M0,2.256758334191025A2.256758334191025,2.256758334191025 0 1,1 0,-2.256758334191025A2.256758334191025,2.256758334191025 0 1,1 0,2.256758334191025Z"></path><path class="nv-point nv-point-5" transform="translate(206.6666717529297,28)" d="M0,2.256758334191025A2.256758334191025,2.256758334191025 0 1,1 0,-2.256758334191025A2.256758334191025,2.256758334191025 0 1,1 0,2.256758334191025Z"></path><path class="nv-point nv-point-6" transform="translate(248,32.66666793823242)" d="M0,2.256758334191025A2.256758334191025,2.256758334191025 0 1,1 0,-2.256758334191025A2.256758334191025,2.256758334191025 0 1,1 0,2.256758334191025Z"></path></g></g><g class="nv-point-paths"></g></g><g class="nv-point-clips"></g></g></g></g></g></g><g class="nv-interactive"><g class=" nv-wrap nv-interactiveLineLayer"><g class="nv-interactiveGuideLine"></g></g></g></g><g class="nv-focusWrap"></g></g></g></svg>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div> -->
              <!-- / WIDGET 5 -->

              <!-- WIDGET 6 -->
              <!-- <div class="col-12 col-lg-6 p-3">
                <div class="widget widget6 card">
                  <div class="widget-header px-4 row no-gutters align-items-center justify-content-between">
                    <div class="col">
                      <span class="h6">Task Distrubition</span>
                    </div>
                    <div class="">
                      <select id="widget6-option-select" class="h6 custom-select">
                        <option selected="" value="TW">This Week</option>
                        <option value="LW">Last Week</option>
                        <option value="2W">2 Weeks Ago</option>
                      </select>
                    </div>
                  </div>
                  <div class="widget-content">
                    <div class="row no-gutters">
                      <div class="col-12">
                        <div id="widget6-main-chart" class="p-4">
                          <svg class="nvd3-svg"><g class="nvd3 nv-wrap nv-pieChart" transform="translate(0,30)"><g><g class="nv-pieWrap nvd3-svg"><g class="nvd3 nv-wrap nv-pie nv-chart-3046" transform="translate(0,0)"><g><g class="nv-pie" transform="translate(258.5,169)"><g class="nv-slice" fill="#f44336" stroke="#f44336"><path d="M1.5943162390702326,-135.19059936153045A135.2,135.2 0 0,1 109.07692297383731,-79.8828196457759L67.81808053983698,-50.407915567817156A84.5,84.5 0 0,0 1.5943162390702497,-84.48495816256191Z"></path></g><g class="nv-slice" fill="#9c27b0" stroke="#9c27b0"><path d="M110.93045710161333,-77.28825064152454A135.2,135.2 0 0,1 109.3626097858289,79.49125474435863L68.70147762773315,49.197123612728426A84.5,84.5 0 0,0 69.67161466761301,-47.81334656356581Z"></path></g><g class="nv-slice" fill="#03a9f4" stroke="#03a9f4"><path d="M107.4575584317928,82.0482366408799A135.2,135.2 0 0,1 -133.95422985149153,18.311316306966457L-83.63831401102763,12.036711735051961A84.5,84.5 0 0,0 66.79642627369708,51.754105509249705Z"></path></g><g class="nv-slice" fill="#e91e63" stroke="#e91e63"><path d="M-134.3488093785896,15.147191771261971A135.2,135.2 0 0,1 -1.5943162390703092,-135.19059936153045L-1.5943162390702414,-84.48495816256191A84.5,84.5 0 0,0 -84.03289353812573,8.872587199347471Z"></path></g></g><g class="nv-pieLabels" transform="translate(258.5,169)"><g class="nv-label" transform="translate(50.261962890625,-97.67680358886719)"><rect rx="3" ry="3" style="stroke: rgb(255, 255, 255); fill: rgb(255, 255, 255);"></rect><text style="text-anchor: middle; fill: rgb(0, 0, 0);">15%</text></g><g class="nv-label" transform="translate(109.8445053100586,1.0984816551208496)"><rect rx="3" ry="3" style="stroke: rgb(255, 255, 255); fill: rgb(255, 255, 255);"></rect><text style="text-anchor: middle; fill: rgb(0, 0, 0);">20%</text></g><g class="nv-label" transform="translate(-28.041460037231445,106.21063232421875)"><rect rx="3" ry="3" style="stroke: rgb(255, 255, 255); fill: rgb(255, 255, 255);"></rect><text style="text-anchor: middle; fill: rgb(0, 0, 0);">38%</text></g><g class="nv-label" transform="translate(-82.34156036376953,-72.71100616455078)"><rect rx="3" ry="3" style="stroke: rgb(255, 255, 255); fill: rgb(255, 255, 255);"></rect><text style="text-anchor: middle; fill: rgb(0, 0, 0);">27%</text></g></g></g></g></g><g class="nv-legendWrap nvd3-svg" transform="translate(0,-30)"><g class="nvd3 nv-legend" transform="translate(0,5)"><g transform="translate(249.37109375,5)"><g class="nv-series" transform="translate(0,5)"><circle class="nv-legend-symbol" r="5" style="stroke-width: 2; fill: rgb(244, 67, 54); fill-opacity: 1; stroke: rgb(244, 67, 54);"></circle><text text-anchor="start" class="nv-legend-text" dy=".32em" dx="8" fill="#000">Frontend</text></g><g class="nv-series" transform="translate(79.5546875,5)"><circle class="nv-legend-symbol" r="5" style="stroke-width: 2; fill: rgb(156, 39, 176); fill-opacity: 1; stroke: rgb(156, 39, 176);"></circle><text text-anchor="start" class="nv-legend-text" dy=".32em" dx="8" fill="#000">Backend</text></g><g class="nv-series" transform="translate(157.544921875,5)"><circle class="nv-legend-symbol" r="5" style="stroke-width: 2; fill: rgb(3, 169, 244); fill-opacity: 1; stroke: rgb(3, 169, 244);"></circle><text text-anchor="start" class="nv-legend-text" dy=".32em" dx="8" fill="#000">Api</text></g><g class="nv-series" transform="translate(207.017578125,5)"><circle class="nv-legend-symbol" r="5" style="stroke-width: 2; fill: rgb(233, 30, 99); fill-opacity: 1; stroke: rgb(233, 30, 99);"></circle><text text-anchor="start" class="nv-legend-text" dy=".32em" dx="8" fill="#000">Isues</text></g></g></g></g></g></g></svg>
                        </div>
                      </div>
                      <div class="divider col-12"></div>
                      <div id="added-tasks" class="col-6 d-flex flex-column align-items-center justify-content-center py-4">
                        <div class="count h2">594</div>
                        <div class="count-title">Tasks Added</div>
                      </div>
                      <div id="completed-tasks" class="col-6 d-flex flex-column align-items-center justify-content-center py-4">
                        <div class="count h2">287</div>
                        <div class="count-title">Tasks Completed</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div> -->
              <!-- / WIDGET 6 -->

              <!-- WIDGET 7 -->
              <!-- <div class="col-12 col-lg-6 p-3">
                <div class="widget widget-7 card">
                  <div class="widget-header px-4 row no-gutters align-items-center justify-content-between">
                    <div class="col">
                      <span class="h6">Schedule</span>
                    </div>
                    <div class="">
                      <select class="h6 custom-select">
                        <option selected="" value="today">Today</option>
                        <option value="yesterday">Yesterday</option>
                        <option value="tomorrow">Tomorrow</option>
                      </select>
                    </div>
                  </div>
                  <div class="widget-content p-4">
                    <div class="py-4 row no-gutters align-items-center justify-content-between">
                      <div class="col">
                        <div class="h6">Group Meeting</div>
                        <div>
                          <span class="text-muted">In 32 minutes</span>
                          <span>, Room 1B</span>
                        </div>
                      </div>
                      <div class="col-auto">
                        <button type="button" class="btn btn-icon fuse-ripple-ready">
                          <i class="icon icon-dots-vertical"></i>
                        </button>
                      </div>
                    </div>
                    <div class="py-4 row no-gutters align-items-center justify-content-between">
                      <div class="col">
                        <div class="h6">Coffee Break</div>
                        <div>
                          <span class="text-muted">10:30 AM</span>
                        </div>
                      </div>
                      <div class="col-auto">
                        <button type="button" class="btn btn-icon fuse-ripple-ready">
                          <i class="icon icon-dots-vertical"></i>
                        </button>
                      </div>
                    </div>
                    <div class="py-4 row no-gutters align-items-center justify-content-between">
                      <div class="col">
                        <div class="h6">Public Beta Release</div>
                        <div>
                          <span class="text-muted">11:00 AM</span>
                        </div>
                      </div>
                      <div class="col-auto">
                        <button type="button" class="btn btn-icon fuse-ripple-ready">
                          <i class="icon icon-dots-vertical"></i>
                        </button>
                      </div>
                    </div>
                    <div class="py-4 row no-gutters align-items-center justify-content-between">
                      <div class="col">
                        <div class="h6">Lunch</div>
                        <div>
                          <span class="text-muted">12:10 PM</span>
                        </div>
                      </div>
                      <div class="col-auto">
                        <button type="button" class="btn btn-icon fuse-ripple-ready">
                          <i class="icon icon-dots-vertical"></i>
                        </button>
                      </div>
                    </div>
                    <div class="py-4 row no-gutters align-items-center justify-content-between">
                      <div class="col">
                        <div class="h6">Dinner with David</div>
                        <div>
                          <span class="text-muted">17:30 PM</span>
                        </div>
                      </div>
                      <div class="col-auto">
                        <button type="button" class="btn btn-icon fuse-ripple-ready">
                          <i class="icon icon-dots-vertical"></i>
                        </button>
                      </div>
                    </div>
                    <div class="py-4 row no-gutters align-items-center justify-content-between">
                      <div class="col">
                        <div class="h6">Jane's Birthday Party</div>
                        <div>
                          <span class="text-muted">19:30 PM</span>
                        </div>
                      </div>
                      <div class="col-auto">
                        <button type="button" class="btn btn-icon fuse-ripple-ready">
                          <i class="icon icon-dots-vertical"></i>
                        </button>
                      </div>
                    </div>
                    <div class="py-4 row no-gutters align-items-center justify-content-between">
                      <div class="col">
                        <div class="h6">Overseer's Retirement Party</div>
                        <div>
                          <span class="text-muted">21:30 PM</span>
                        </div>
                      </div>
                      <div class="col-auto">
                        <button type="button" class="btn btn-icon fuse-ripple-ready">
                          <i class="icon icon-dots-vertical"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div> -->
              <!-- / WIDGET 7 -->
            </div>
            <!-- / WIDGET GROUP -->
          </div>
        </div>
      </div>
    </div>

    <aside class="page-sidebar custom-scrollbar" data-fuse-bar="dashboard-project-sidebar" data-fuse-bar-media-step="lg" data-fuse-bar-position="right" data-ps-id="142eeeb8-1233-c798-0ae4-061973cead57">
      <!-- WIDGET GROUP -->
      <div class="widget-group">
        <!-- NOW WIDGET -->
        <div class="widget widget-now">
          <div class="widget-header row no-gutters align-items-center justify-content-between pl-4 py-4">
            <div class="h6">{{weektime}}</div>
            <button type="button" class="btn btn-icon fuse-ripple-ready" aria-label="Options">
              <i class="icon icon-dots-vertical"></i>
            </button>
          </div>

          <div class="widget-content d-flex flex-column align-items-center justify-content-center p-4 pb-6">
            <div class="month text-muted">{{month}}</div>
            <div class="day text-muted">{{day}}</div>
            <div class="year text-muted">{{year}}</div>
          </div>
        </div>
        <!-- / NOW WIDGET -->
        <div class="divider"></div>
        <!-- WEATHER WIDGET -->
        <div class="widget widget-weather">
          <div class="widget- header row no-gutters align-items-center justify-content-between pl-4 py-4">
            <div class="row no-gutters align-items-center">
              <i class="icon-map-marker mr-2"></i>
              <span class="h6">New York</span>
            </div>
            <button type="button" class="btn btn-icon fuse-ripple-ready" aria-label="Options">
              <i class="icon icon-dots-vertical"></i>
            </button>
          </div>

          <div class="d-flex flex-column align-items-center justify-content-center p-4 pb-8">
            <div class="today-weather row no-gutters align-items-center justify-content-center">
              <i class="icon-weather-pouring s-10 mr-4"></i>
              <span class="h1">22</span>
              <span class="h1 text-muted">°</span>
              <span class="h1 text-muted">C</span>
            </div>
          </div>

          <div class="row no-gutters align-items-center justify-content-between p-4">
            <div class="row no-gutters align-items-center">
              <i class="icon-weather-windy icon mr-2 s-5"></i>
              <span>12</span>
              <span class="text-muted ml-1">KMH</span>
            </div>
            <div class="row align-items-center">
              <i class="icon-compass-outline icon mr-2 s-5"></i>
              <span>NW</span>
            </div>
            <div class="row no-gutters align-items-center">
              <i class="icon-umbrella icon mr-2 s-5"></i>
              <span>98%</span>
            </div>
          </div>

          <div class="row no-gutters align-items-center justify-content-between p-4">
            <span class="">Sunday</span>
            <div class="row no-gutters align-items-center">
              <i class="mr-4 icon-weather-pouring"></i>
              <span class="h5">21</span>
              <span class="h5 text-muted">°</span>
              <span class="h5 text-muted">C</span>
            </div>
          </div>

          <div class="row no-gutters align-items-center justify-content-between p-4">
            <span class="">Sunday</span>
            <div class="row no-gutters align-items-center">
              <i class="mr-4 icon-weather-pouring"></i>
              <span class="h5">19</span>
              <span class="h5 text-muted">°</span>
              <span class="h5 text-muted">C</span>
            </div>
          </div>

          <div class="row no-gutters align-items-center justify-content-between p-4">
            <span class="">Tuesday</span>
            <div class="row no-gutters align-items-center">
              <i class="mr-4 icon-weather-partlycloudy"></i>
              <span class="h5">24</span>
              <span class="h5 text-muted">°</span>
              <span class="h5 text-muted">C</span>
            </div>
          </div>
        </div>
        <!-- / WEATHER WIDGET -->

        <div class="divider"></div>
      </div>
      <!-- / WIDGET GROUP -->
    </aside>
  </div>
</template>

<script>
import moment from 'moment'
import Chart from 'chart.js'
import LoaderComponent from '@/components/Loader'

export default {
  name: 'Dashboard',
  components: {
    LoaderComponent
  },
  data () {
    return {
      loading: false,
      activeMonth: 'current',
      timerID: '',
      weektime: '',
      year: '',
      day: '',
      month: '',
      charts: {
        byType: '',
        byCategory: ''
      },
      report: {},
      money: {
        decimal: '.',
        thousands: ',',
        prefix: '$ ',
        suffix: '',
        precision: 2,
        masked: false,
        format: (value) => {
          return (this.money.prefix + ~~value + this.money.decimal + ((value % 1).toFixed(2).substring(2)))
        }
      }
    }
  },
  computed: {
    valueExpenses () {
      if (this.loading || !Object.keys(this.report).length || !this.report[this.activeMonth] || !Object.keys(this.report[this.activeMonth]).length) {
        return '-'
      }
      return this.money.format(this.report[this.activeMonth].situation.price.settled + this.report[this.activeMonth].situation.price.pending)
    },
    valuePending () {
      if (this.loading || !Object.keys(this.report).length || !this.report[this.activeMonth] || !Object.keys(this.report[this.activeMonth]).length) {
        return '-'
      }
      return this.money.format(this.report[this.activeMonth].situation.price.pending)
    },
    valueSettled () {
      if (this.loading || !Object.keys(this.report).length || !this.report[this.activeMonth] || !Object.keys(this.report[this.activeMonth]).length) {
        return '-'
      }
      return this.money.format(this.report[this.activeMonth].situation.price.settled)
    },
    quantityExpenses () {
      if (this.loading || !Object.keys(this.report).length || !this.report[this.activeMonth] || !Object.keys(this.report[this.activeMonth]).length) {
        return '-'
      }
      return (this.report[this.activeMonth].situation.quantity.settled + this.report[this.activeMonth].situation.quantity.pending)
    },
    quantityPending () {
      if (this.loading || !Object.keys(this.report).length || !this.report[this.activeMonth] || !Object.keys(this.report[this.activeMonth]).length) {
        return '-'
      }
      return this.report[this.activeMonth].situation.quantity.pending
    },
    quantitySettled () {
      if (this.loading || !Object.keys(this.report).length || !this.report[this.activeMonth] || !Object.keys(this.report[this.activeMonth]).length) {
        return '-'
      }
      return this.report[this.activeMonth].situation.quantity.settled
    },
    categoryMostExpensive () {
      let category = {name: '-', price: '-', quantity: 0}
      if (this.loading || !Object.keys(this.report).length || !this.report[this.activeMonth] || !Object.keys(this.report[this.activeMonth]).length) {
        return category
      }

      let arr = Object.values(this.report[this.activeMonth].category.price)
      let max = arr.reduce((max, p) => p > max ? p : max, arr[0])
      let name = Object.keys(this.report[this.activeMonth].category.price).reduce((data, key) => {
        data[this.report[this.activeMonth].category.price[key]] = key
        return data
      }, {})[max]

      category.name = name
      category.price = this.money.format(this.report[this.activeMonth].category.price[name])
      category.quantity = this.report[this.activeMonth].category.quantity[name]
      return category
    },
    dataChartExpenseByType () {
      if (this.loading || !Object.keys(this.report).length || !this.report[this.activeMonth] || !Object.keys(this.report[this.activeMonth]).length) {
        return {}
      }
      return {
        datasets: [{
          data: [
            this.report[this.activeMonth].type.price.fixed.toFixed(2),
            this.report[this.activeMonth].type.price.casual.toFixed(2),
            this.report[this.activeMonth].type.price.superfluous.toFixed(2)
          ],
          backgroundColor: [
            '#2196F3',
            '#FFEB3B',
            '#F44336'
          ]
        }],
        labels: [
          'Fixed',
          'Casual',
          'Superfluous'
        ]
      }
    },
    dataChartExpenseByCategory () {
      if (this.loading || !Object.keys(this.report).length || !this.report[this.activeMonth] || !Object.keys(this.report[this.activeMonth]).length) {
        return {}
      }
      return {
        datasets: [{
          data: Object.values(this.report[this.activeMonth].category.price).map(elem => elem.toFixed(3)),
          backgroundColor: Object.values(this.report[this.activeMonth].category.price).map(() => '#' + Math.floor(Math.random() * 16777215).toString(16))
        }],
        labels: Object.keys(this.report[this.activeMonth].category.quantity)
      }
    },
    dateReport () {
      if (this.loading || !(Object.keys(this.report).length)) {
        return 'Never generated'
      }
      return moment(String(this.report.date)).format('YYYY-MM-DD HH:mm')
    }
  },
  methods: {
    mountCharts () {
      if (typeof this.charts.byType === 'string') {
        this.charts.byType = new Chart(this.$refs.expenseByType.getContext('2d'), {
          type: 'pie',
          data: this.dataChartExpenseByType,
          options: {
            legend: {
              position: 'left'
            }
          }
        })
        this.charts.byCategory = new Chart(this.$refs.expenseByCategory.getContext('2d'), {
          type: 'pie',
          data: this.dataChartExpenseByCategory,
          options: {
            legend: {
              display: false
            }
          }
        })
        return true
      }
      this.charts.byType.data = this.dataChartExpenseByType
      this.charts.byType.update()
      this.charts.byCategory.data = this.dataChartExpenseByCategory
      this.charts.byCategory.update()
      return false
    },
    updateWeekTime () {
      let date = moment()
      this.weektime = date.format('dddd') + ', ' + date.format('HH') + ':' + date.format('mm') + ':' + date.format('ss')
      this.year = date.format('YYYY')
      this.day = date.format('DD')
      this.month = date.format('MMM')
    },
    toProcessDataExpense (expenses, node) {
      let report = {}
      report.situation = {}
      report.situation.price = {}
      report.situation.quantity = {}
      report.type = {}
      report.type.price = {}
      report.type.quantity = {}
      report.category = {}
      report.category.price = {}
      report.category.quantity = {}
      report.situation.price.settled = expenses.reduce((sum, element) => sum + (element.situation === 'Settled' ? element.price : 0), 0)
      report.situation.price.pending = expenses.reduce((sum, element) => sum + (element.situation === 'Pending' ? element.price : 0), 0)
      report.situation.quantity.settled = expenses.filter(element => element.situation === 'Settled').length
      report.situation.quantity.pending = expenses.filter(element => element.situation === 'Pending').length
      report.type.price.fixed = expenses.reduce((sum, element) => sum + (element.type === 'Fixed' ? element.price : 0), 0)
      report.type.price.casual = expenses.reduce((sum, element) => sum + (element.type === 'Casual' ? element.price : 0), 0)
      report.type.price.superfluous = expenses.reduce((sum, element) => sum + (element.type === 'Superfluous' ? element.price : 0), 0)
      report.type.quantity.fixed = expenses.filter(element => element.type === 'Fixed').length
      report.type.quantity.casual = expenses.filter(element => element.type === 'Casual').length
      report.type.quantity.superfluous = expenses.filter(element => element.type === 'Superfluous').length
      for (let idx in this.$store.state.categories) {
        report.category.price[this.$store.state.categories[idx]] = expenses.reduce((sum, element) => sum + (element.category === this.$store.state.categories[idx] ? element.price : 0), 0)
        report.category.quantity[this.$store.state.categories[idx]] = expenses.filter(element => element.category === this.$store.state.categories[idx]).length
      }
      this.report[node] = report
      return report
    },
    getCurrentMonth () {
      return this.$store.dispatch('getExpense', {
        month: moment().format('MM'),
        year: moment().format('YYYY')
      })
        .then(data => this.toProcessDataExpense(data, 'current'))
        .catch(/* istanbul ignore next */() => this.toProcessDataExpense([], 'current'))
    },
    getNextMonth () {
      let date = moment().add(1, 'months')
      return this.$store.dispatch('getExpense', {
        month: date.format('MM'),
        year: date.format('YYYY')
      })
        .then(data => this.toProcessDataExpense(data, 'next'))
        .catch(/* istanbul ignore next */() => this.toProcessDataExpense([], 'next'))
    },
    getPreviousMonth () {
      let date = moment().subtract(1, 'months')
      return this.$store.dispatch('getExpense', {
        month: date.format('MM'),
        year: date.format('YYYY')
      })
        .then(data => this.toProcessDataExpense(data, 'previous'))
        .catch(/* istanbul ignore next */() => this.toProcessDataExpense([], 'previous'))
    },
    createReport () {
      this.loading = true
      this.report = {}
      let reports = []
      reports.push(this.getCurrentMonth())
      reports.push(this.getNextMonth())
      reports.push(this.getPreviousMonth())
      Promise.all(reports)
        .then(() => {
          this.saveReport()
        })
        .catch(/* istanbul ignore next */error => console.log(error.message))
    },
    saveReport () {
      this.report.date = moment()
      this.$store.dispatch('updateReport', {id: 'dashboard', report: this.report})
        .then(/* istanbul ignore next */() => {
          setTimeout(() => {
            this.mountCharts()
          }, 1000)
        })
        .catch(/* istanbul ignore next */() => { this.loading = false })
        .finally(/* istanbul ignore next */() => { this.loading = false })
    }
  },
  mounted () {
    this.timerID = setInterval(this.updateWeekTime, 1000)
    this.loading = true
    this.$store.dispatch('getReportById', 'dashboard')
      .then(/* istanbul ignore next */report => {
        if (!report) {
          throw Error('Not found')
        }
        this.report = report
        setTimeout(() => {
          this.mountCharts()
        }, 1000)
      })
      .catch(/* istanbul ignore next */() => this.createReport())
      .finally(/* istanbul ignore next */() => { this.loading = false })
  }
}
</script>

<style scoped>
#loading { width: 100%; margin-top: 30%; text-align: center; }
.widget1 .title,
.widget2 .title,
.widget3 .title,
.widget4 .title { font-size: 4rem !important; }
.page-header select { background: transparent; color: #fff; }
.page-header select option { color: #495057; }
.page-header button.btn { color: #fff; }
@media screen and (max-width: 1500px) {
  .widget1 .title,
  .widget2 .title,
  .widget3 .title,
  .widget4 .title { font-size: 3.5rem !important; }
}
@media screen and (max-width: 1350px) {
  .widget1 .title,
  .widget2 .title,
  .widget3 .title,
  .widget4 .title { font-size: 3rem !important; }
}
@media screen and (max-width: 1200px) {
  .widget1 .title,
  .widget2 .title,
  .widget3 .title,
  .widget4 .title { font-size: 6rem !important; }
}
@media screen and (max-width: 800px) {
  .widget1 .title,
  .widget2 .title,
  .widget3 .title,
  .widget4 .title { font-size: 5.5rem !important; }
}
@media screen and (max-width: 700px) {
  .widget1 .title,
  .widget2 .title,
  .widget3 .title,
  .widget4 .title { font-size: 4.7rem !important; }
}
</style>
