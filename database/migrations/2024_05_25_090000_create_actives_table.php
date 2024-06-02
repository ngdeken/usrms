<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('actives', function (Blueprint $table) {
            $table->bigIncrements('activeID');
            $table->unsignedBigInteger('studentID')->nullable();
            $table->foreign('studentID')->references('studentID')->on('students');
            $table->string('position');
            $table->integer('merit');
            $table->unsignedBigInteger('eventID');
            $table->foreign('eventID')->references('eventID')->on('events');
            $table->string('activeImage')->nullable();
            $table->unsignedBigInteger('created_by');
            $table->foreign('created_by')->references('id')->on('users');
            $table->unsignedBigInteger('updated_by');
            $table->foreign('updated_by')->references('id')->on('users');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('actives');
    }
};
