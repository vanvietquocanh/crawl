
module.exports = function(permission, req) {
	var name = req.headers.host.split(".")[0]
	var sidebar =  `<nav id="sidebar">
			            <div class="sidebar-header">
			                <h3>${name.charAt(0).toUpperCase() + name.slice(1)}</h3>
			            </div>
			            <ul class="list-unstyled components">
			                <li>
			                    <a href="/${permission}/view?type=dashboard"><i class="fas fa-chart-pie pr-2"></i>Dashboard</a>
			                </li>
			            </ul>`
	if(permission==="admin"){
		sidebar+=  		`<ul class="list-unstyled components mb-0">
			                <li class="">
			                    <a href="/${permission}/view?type=offers&page=1"><i class="fas fa-clipboard-list pr-2"></i>Offers</a>
			                </li>
			                <li>
			                    <a href="/${permission}/view?type=device"><i class="fas fa-tablet-alt pr-2"></i>Device</a>
			                </li>
			                <li>
			                    <a href="/${permission}/view?type=script"><i class="fas fa-list-ul pr-2"></i>Script</a>
			                </li>
			                <li>
			                    <a href="/${permission}/view?type=smart-link&page=1"><i class="fas fa-external-link-alt pr-2"></i>Smart Link</a>
			                </li>
			                <li>
			                    <a href="/${permission}/view?type=clicks&page=1"><i class="fas fa-vial pr-2"></i>Clicks</a>
			                </li>
			                <li>
			                    <a href="/${permission}/view?type=conversions&page=1"><i class="fas fa-comments-dollar pr-2"></i>Conversions</a>
			                </li>
			                <li>
			                    <a href="/${permission}/view?type=user-manager&page=1"><i class="fas fa-users pr-2"></i>User Manager</a>
			                </li>
			                <li>
			                    <a href="/${permission}/view?type=add-offer&page=1"><i class="fas fa-pencil-alt pr-2"></i>Add offer</a>
			                </li>
			                <li>
			                    <a href="/${permission}/view?type=network"><i class="fas fa-network-wired pr-2"></i></i>Network</a>
			                </li>
			                <li>
			                    <a href="/${permission}/view?type=proxy"><i class="fas fa-wifi pr-2"></i>Proxy</a>
			                </li>
			            </ul>`
	}else{
		sidebar+= 		`<ul class="list-unstyled components mb-0">
							<li class="">
			                    <a href="/${permission}/view?type=services"><i class="fas fa-concierge-bell pr-2"></i>Services</a>
			                </li>
			                <li class="">
			                    <a href="/${permission}/view?type=payment-history&page=1"><i class="fas fa-clipboard-list pr-2"></i>Payment History</a>
			                </li>
			            </ul>`
	}
	sidebar += `<ul class="list-unstyled components mb-0">
	                <li>
	                    <a href="/${permission}/view?type=facebook&status=&friends=-1_5000&veryfile=&country=&page=1"><i class="fab fa-facebook-f pr-2"></i>Facebook</a>
	                </li>
	                <li>
	                    <a href="/${permission}/view?type=email&page=1"><i class="fas fa-at pr-2"></i>Email</a>
	                </li>
	                <li>
	                    <a href="/${permission}/view?type=sms&page=1"><i class="fas fa-file-invoice pr-2"></i>SMS</a>
	                </li>`
	sidebar +=  `</ul>
					<ul class="list-unstyled components mb-0">
		                <li>
		                    <a href="/${permission}/view?type=report"><i class="fas fa-bug pr-2"></i>Report</a>
		                </li>
		                <li>
		                    <a href="/logout"><i class="fas fa-sign-out-alt pr-2"></i>Logout</a>
		                </li>
	            	</ul>
	            </nav>`;
	return sidebar;
}