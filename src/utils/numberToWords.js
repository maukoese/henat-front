var num = [
	"zero",
	"one",
	"two",
	"three",
	"four",
	"five",
	"six",
	"seven",
	"eight",
	"nine",
	"ten",
	"eleven",
	"twelve",
	"thirteen",
	"fourteen",
	"fifteen",
	"sixteen",
	"seventeen",
	"eighteen",
	"nineteen",
];
var tens = [
	"twenty",
	"thirty",
	"forty",
	"fifty",
	"sixty",
	"seventy",
	"eighty",
	"ninety",
];
function convert(n) {
	if (n < 20) {
		return num[n];
	}
  
	var digit = n % 10;

	if (n < 100) {
		return tens[~~(n / 10) - 2] + (digit ? "-" + num[digit] : "");
	}

	if (n < 1000) {
		return (
			num[~~(n / 100)] +
			" hundred" +
			(n % 100 === 0 ? "" : " and " + convert(n % 100))
		);
	}

	return (
		convert(~~(n / 1000)) +
		" thousand" +
		(n % 1000 !== 0 ? " " + convert(n % 1000) : "")
	);
}

export default function number2words(n) {
	var nums = n.toString().split(".");
	var whole = convert(nums[0]);
	if (nums.length === 2) {
		var fraction = convert(nums[1]);
		return whole + " point " + fraction;
	} else {
		return whole;
	}
}
