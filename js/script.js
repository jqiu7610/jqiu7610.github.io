document.addEventListener("DOMContentLoaded", function () {

	// Loader
	var loader = document.getElementById("loader");
	window.addEventListener("load", function () {
		loader.classList.add("is-hidden");
	});

	// Typing effect
	var typedEl = document.querySelector(".typed");
	var strings = ["Consumer Lending Models.", "Machine Learning Workflows.", "Data Engineering Workflows.", "Credit Risk Solutions.", "CFPB Compliant Tools."];
	var strIndex = 0;
	var charIndex = 0;
	var deleting = false;

	function typeLoop() {
		var current = strings[strIndex];

		if (!deleting) {
			charIndex++;
			typedEl.textContent = current.slice(0, charIndex);

			if (charIndex === current.length) {
				deleting = true;
				setTimeout(typeLoop, 1400);
				return;
			}
		} else {
			charIndex--;
			typedEl.textContent = current.slice(0, charIndex);

			if (charIndex === 0) {
				deleting = false;
				strIndex = (strIndex + 1) % strings.length;
			}
		}

		setTimeout(typeLoop, deleting ? 35 : 70);
	}

	setTimeout(typeLoop, 800);

	// Sticky nav shadow/border
	var nav = document.getElementById("navigation");
	window.addEventListener("scroll", function () {
		nav.classList.toggle("is-scrolled", window.scrollY > 10);
	});

	// Mobile nav toggle
	var navToggle = document.getElementById("navToggle");
	var navLinks = document.getElementById("navLinks");

	navToggle.addEventListener("click", function () {
		var isOpen = navLinks.classList.toggle("is-open");
		navToggle.setAttribute("aria-expanded", isOpen);
	});

	navLinks.querySelectorAll("a").forEach(function (link) {
		link.addEventListener("click", function () {
			navLinks.classList.remove("is-open");
			navToggle.setAttribute("aria-expanded", "false");
		});
	});

	// Smooth-scroll offset for fixed nav
	document.querySelectorAll('a[href^="#"]').forEach(function (link) {
		link.addEventListener("click", function (e) {
			var targetId = link.getAttribute("href");
			var target = document.querySelector(targetId);
			if (!target) return;

			e.preventDefault();
			var navHeight = nav.offsetHeight;
			var top = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
			window.scrollTo({ top: top, behavior: "smooth" });
		});
	});

	// Animate skill bars on scroll into view
	var skillCards = document.querySelectorAll(".skill-card");

	var observer = new IntersectionObserver(function (entries) {
		entries.forEach(function (entry) {
			if (!entry.isIntersecting) return;

			var card = entry.target;
			var fill = card.querySelector(".skill-bar-fill");
			var percentEl = card.querySelector(".skill-percent");
			var percent = parseInt(fill.getAttribute("data-percent"), 10);

			fill.style.width = percent + "%";

			var start = 0;
			var duration = 1100;
			var startTime = null;

			function step(timestamp) {
				if (!startTime) startTime = timestamp;
				var progress = Math.min((timestamp - startTime) / duration, 1);
				percentEl.textContent = Math.round(progress * percent) + "%";
				if (progress < 1) requestAnimationFrame(step);
			}

			requestAnimationFrame(step);
			observer.unobserve(card);
		});
	}, { threshold: 0.4 });

	skillCards.forEach(function (card) {
		observer.observe(card);
	});

	// Toggle inline resume viewer
	var toggleResumeBtn = document.getElementById("toggleResume");
	var resumeEmbed = document.getElementById("resumeEmbed");

	toggleResumeBtn.addEventListener("click", function () {
		var isHidden = resumeEmbed.hasAttribute("hidden");

		if (isHidden) {
			resumeEmbed.removeAttribute("hidden");
			toggleResumeBtn.textContent = "Hide Resume";
			toggleResumeBtn.setAttribute("aria-expanded", "true");
			resumeEmbed.scrollIntoView({ behavior: "smooth", block: "start" });
		} else {
			resumeEmbed.setAttribute("hidden", "");
			toggleResumeBtn.textContent = "View Resume Inline";
			toggleResumeBtn.setAttribute("aria-expanded", "false");
		}
	});

	// Footer year
	document.getElementById("year").textContent = new Date().getFullYear();

});
