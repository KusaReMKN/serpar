'use strict';

system.addEventListener('input', _ => {
	figure.src = `./${system.value}.webp`;
	setTimeout(() => update());
});

lambda1.addEventListener('input', _ => {
	lambda1out.value = lambda1.value;
	setTimeout(() => update());
});
lambda2.addEventListener('input', _ => {
	lambda2out.value = lambda2.value;
	setTimeout(() => update());
});
lambda3.addEventListener('input', _ => {
	lambda3out.value = lambda3.value;
	setTimeout(() => update());
});
lambda4.addEventListener('input', _ => {
	lambda4out.value = lambda4.value;
	setTimeout(() => update());
});

function
ser_calc(i)
{
	return Math.exp(-i * +lambda1.value)
		* Math.exp(-i * +lambda2.value)
		* Math.exp(-i * +lambda3.value)
		* Math.exp(-i * +lambda4.value);
}

function
par_calc(i)
{
	return 1 - (1 - Math.exp(-i * +lambda1.value))
		* (1 - Math.exp(-i * +lambda2.value))
		* (1 - Math.exp(-i * +lambda3.value))
		* (1 - Math.exp(-i * +lambda4.value));
}

function
parser_calc(i)
{
	return (1 - (1 - Math.exp(-i * +lambda1.value))
			* (1 - Math.exp(-i * +lambda2.value)))
		* (1 - (1 - Math.exp(-i * +lambda3.value))
				* (1 - Math.exp(-i * +lambda4.value)));
}

function
serpar_calc(i)
{
	return 1 - (1 - Math.exp(-i * +lambda1.value) * Math.exp(-i * +lambda3.value))
		* (1 - Math.exp(-i * +lambda2.value) * Math.exp(-i * +lambda4.value));
}

function
update()
{
	const ctx = canvas.getContext('2d');
	const [ width, height ] = [ canvas.width, canvas.height ];

	ctx.clearRect(-width, -height, 2*width, 2*height);
	ctx.setTransform(400, 0, 0, -400, 32, height - 32);
	ctx.lineWidth = 1/400;

	ctx.strokeStyle = `black`;
	ctx.beginPath(); ctx.moveTo(-2, 0); ctx.lineTo(+2, 0); ctx.stroke();
	ctx.beginPath(); ctx.moveTo(0, -2); ctx.lineTo(0, +2); ctx.stroke();

	ctx.strokeStyle = `gray`;
	ctx.beginPath(); ctx.moveTo(-2, 1); ctx.lineTo(+2, 1); ctx.stroke();
	ctx.strokeStyle = `silver`;
	ctx.beginPath(); ctx.moveTo(-2, .5); ctx.lineTo(+2, .5); ctx.stroke();

	ctx.strokeStyle = `#F00`;
	ctx.beginPath();
	ctx.moveTo(0, 1);
	for (let i = 0; i < 100; i += 1/width)
		ctx.lineTo(i/10, Math.exp(-i * +lambda1.value));
	ctx.stroke();
	ctx.strokeStyle = `#0F0`;
	ctx.beginPath();
	ctx.moveTo(0, 1);
	for (let i = 0; i < 100; i += 1/width)
		ctx.lineTo(i/10, Math.exp(-i * +lambda2.value));
	ctx.stroke();
	ctx.strokeStyle = `#F0F`;
	ctx.beginPath();
	ctx.moveTo(0, 1);
	for (let i = 0; i < 100; i += 1/width)
		ctx.lineTo(i/10, Math.exp(-i * +lambda3.value));
	ctx.stroke();
	ctx.strokeStyle = `#0FF`;
	ctx.beginPath();
	ctx.moveTo(0, 1);
	for (let i = 0; i < 100; i += 1/width)
		ctx.lineTo(i/10, Math.exp(-i * +lambda4.value));
	ctx.stroke();

	ctx.lineWidth = 3/400;
	ctx.strokeStyle = `#000`;
	ctx.beginPath();
	ctx.moveTo(0, 1);
	for (let i = 0; i < 100; i += 1/width) {
		ctx.lineTo(i/10, {
			ser: ser_calc,
			par: par_calc,
			parser: parser_calc,
			serpar: serpar_calc,
		}[system.value](i));
	}
	ctx.stroke();
}

update();
